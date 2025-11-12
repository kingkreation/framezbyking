import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useAuth from '../hooks/useAuth';
import { supabase } from '../services/supabaseClient';
import { colors, spacing } from '../theme';

export default function CreatePostScreen({ navigation }) {
  const { user, profile } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need access to your photos to upload images.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.8 });
    if (!result.canceled) {
      const asset = result.assets?.[0];
      setImage(asset?.uri || null);
    }
  };

  const uploadImageToStorage = async () => {
    if (!image) return null;
    const fileName = `${user.id}/${Date.now()}.jpg`;
    const resp = await fetch(image);
    const blob = await resp.blob();
    const { error } = await supabase.storage.from('posts').upload(fileName, blob, { contentType: 'image/jpeg', upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from('posts').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const submitPost = async () => {
    try {
      if (!user) return;
      setSubmitting(true);
      const imageUrl = await uploadImageToStorage();
      const { error } = await supabase.from('posts').insert({
        user_id: user.id,
        content: content?.trim() || null,
        image_url: imageUrl || null,
        author_name: profile?.name || null,
      });
      if (error) throw error;
      Alert.alert('Posted', 'Your post has been created.');
      setContent('');
      setImage(null);
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Say something..."
        multiline
        value={content}
        onChangeText={setContent}
      />
      {image && <Image source={{ uri: image }} style={styles.preview} />}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.secondary]} onPress={pickImage}>
          <Text style={styles.buttonSecondaryText}>Add Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={submitPost} disabled={submitting}>
          <Text style={styles.buttonText}>{submitting ? 'Posting...' : 'Post'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: spacing.md, minHeight: 110, backgroundColor: colors.card },
  preview: { width: '100%', height: 220, borderRadius: 12, marginTop: spacing.md, backgroundColor: '#f2f2f2' },
  row: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg },
  button: { flex: 1, backgroundColor: colors.primary, padding: spacing.md, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  buttonSecondaryText: { color: colors.text, fontWeight: '700' },
});
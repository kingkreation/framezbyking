import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const { control, handleSubmit } = useForm({ defaultValues: { name: '', email: '', password: '' } });
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ name, email, password }) => {
    try {
      setLoading(true);
      await signUp(name.trim(), email.trim(), password);
      Alert.alert('Success', 'Account created. You are logged in.');
    } catch (e) {
      Alert.alert('Registration failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your Framez account</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: true, minLength: 2 }}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Full Name" value={value} onChangeText={onChange} />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={value} onChangeText={onChange} />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: true, minLength: 6 }}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={value} onChangeText={onChange} />
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Register'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: '#000', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});
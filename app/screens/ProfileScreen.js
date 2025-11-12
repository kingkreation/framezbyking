import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import useAuth from '../hooks/useAuth';
import { supabase } from '../services/supabaseClient';
import PostCard from '../components/PostCard';

export default function ProfileScreen() {
  const { profile, user, signOut } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('id, content, image_url, created_at, profiles(name)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (!error) setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyPosts();
  }, [user?.id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{profile?.name || 'Me'}</Text>
          <Text style={styles.email}>{profile?.email || user?.email}</Text>
        </View>
        <Text style={styles.logout} onPress={signOut}>Logout</Text>
      </View>
      {loading ? (
        <View style={styles.loader}><ActivityIndicator size="large" /></View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#777' }}>No posts yet</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 72,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: { fontSize: 18, fontWeight: '700' },
  email: { fontSize: 12, color: '#777' },
  logout: { color: '#FF3B30', fontWeight: '700' },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { padding: 16 },
});
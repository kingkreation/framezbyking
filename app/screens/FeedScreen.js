import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';
import { supabase } from '../services/supabaseClient';
import PostCard from '../components/PostCard';
import { useIsFocused } from '@react-navigation/native';

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('id, content, image_url, created_at, profiles(name)')
      .order('created_at', { ascending: false });
    if (!error) setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [isFocused]);

  useEffect(() => {
    const channel = supabase.channel('posts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, (payload) => {
        fetchPosts();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loader}><ActivityIndicator size="large" color={colors.primary} /></View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await fetchPosts(); setRefreshing(false); }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { padding: spacing.lg },
});
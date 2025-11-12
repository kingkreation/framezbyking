import { Image, StyleSheet, Text, View } from 'react-native';
import { timeAgo } from '../utils/timeAgo';

export default function PostCard({ post }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.author}>{post?.profiles?.name || post.author_name || 'Unknown'}</Text>
        <Text style={styles.timestamp}>{timeAgo(post?.created_at)}</Text>
      </View>
      {post?.content && <Text style={styles.content}>{post.content}</Text>}
      {post?.image_url && (
        <Image source={{ uri: post.image_url }} style={styles.image} resizeMode="cover" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  author: { fontWeight: '600', fontSize: 14 },
  timestamp: { color: '#777', fontSize: 12 },
  content: { marginBottom: 8, fontSize: 14 },
  image: { width: '100%', height: 200, borderRadius: 8, backgroundColor: '#f2f2f2' },
});
import { Image, StyleSheet, Text, View } from 'react-native';
import { timeAgo } from '../utils/timeAgo';
import { colors, spacing, shadow } from '../theme';

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
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  author: { fontWeight: '700', fontSize: 14, color: colors.primary },
  timestamp: { color: colors.muted, fontSize: 12 },
  content: { marginBottom: spacing.sm, fontSize: 15, color: colors.text },
  image: { width: '100%', height: 200, borderRadius: 10, backgroundColor: '#f2f2f2' },
});
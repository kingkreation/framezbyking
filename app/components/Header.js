import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Header({ title, rightLabel, onRightPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {rightLabel ? (
        <TouchableOpacity onPress={onRightPress}>
          <Text style={styles.action}>{rightLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  title: { fontSize: 18, fontWeight: '700' },
  action: { fontSize: 14, color: '#007AFF', fontWeight: '600' },
});
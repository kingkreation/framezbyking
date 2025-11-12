import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { colors, spacing } from '../theme';

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const { control, handleSubmit } = useForm({ defaultValues: { email: '', password: '' } });
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await signIn(email.trim(), password);
    } catch (e) {
      Alert.alert('Login failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Framez</Text>
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
        <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Login'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>No account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, justifyContent: 'center', backgroundColor: colors.background },
  title: { fontSize: 26, fontWeight: '800', marginBottom: spacing.xl, textAlign: 'center', color: colors.primary },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, backgroundColor: colors.card },
  button: { backgroundColor: colors.primary, padding: spacing.md, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  link: { marginTop: spacing.lg, textAlign: 'center', color: colors.primary, fontWeight: '600' },
});
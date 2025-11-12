import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import useAuth from '../hooks/useAuth';

export default function Navigation() {
  const { loading, session } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return session ? <AppStack /> : <AuthStack />;
}
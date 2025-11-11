import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './app/context/AuthContext';
import Navigation from './app/navigation';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

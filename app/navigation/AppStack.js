import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import FeedScreen from '../screens/FeedScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={({ navigation }) => ({
          title: 'Framez',
          headerRight: () => (
            <Ionicons name="add-outline" size={24} color="#fff" onPress={() => navigation.navigate('CreatePost')} />
          ),
          headerLeft: () => (
            <Ionicons name="person-circle-outline" size={24} color="#fff" onPress={() => navigation.navigate('Profile')} />
          ),
        })}
      />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'New Post' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
    </Stack.Navigator>
  );
}
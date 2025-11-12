import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import FeedScreen from '../screens/FeedScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={({ navigation }) => ({
          title: 'Framez',
          headerRight: () => (
            <Text style={{ color: '#007AFF', fontWeight: '700' }} onPress={() => navigation.navigate('CreatePost')}>New</Text>
          ),
          headerLeft: () => (
            <Text style={{ color: '#007AFF', fontWeight: '700' }} onPress={() => navigation.navigate('Profile')}>Me</Text>
          ),
        })}
      />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'New Post' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
    </Stack.Navigator>
  );
}
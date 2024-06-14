import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useSelector } from 'react-redux';
import {  selectUser } from "./store/slices/userSlice";
import StoriesScreen from "./screens/StoriesScreen";
import StoryDetailScreen from "./screens/StoryDetailScreen";
import AddChapterScreen from './screens/AddChapterScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const user = useSelector(selectUser);

  return (
    <Stack.Navigator>
      {user ? (
        <>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Stories" component={StoriesScreen}/>
        <Stack.Screen name="StoryDetails" component={StoryDetailScreen}/>
        <Stack.Screen name="AddChapter" component={AddChapterScreen} />
          </>
      ) : (
        <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Create account" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
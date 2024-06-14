import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectUser } from "./store/slices/userSlice";


const Stack = createNativeStackNavigator();

export default function App() {
  const user = useSelector(selectUser);

  return (
    <Stack.Navigator>
      {user ? (
        <>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
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
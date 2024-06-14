import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Slogan from './screens/App/Slogan';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AuthContext from "./contexts/AuthContext";
import { loadUser } from "./services/AuthService";
import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    async function runEffect() {
      try {
        const user = await loadUser();
        setUser(user);
      } catch(e) {
        console.log("Failed to load user", e);
      }

      setStatus("idle");
    }

    runEffect();
  }, []);

  if (status === "Loading") {
    return <SplashScreen/>
  }

  return (
    // <View className="flex-1 justify-center items-center bg-gray-800 border border-gray-800 rounded">
    //   {/* <StatusBar style='auto' className="flex flex-row space-x-2" />
    //   <Text className="text-center mt-3 text-5xl font-bold text-ocean">
    //     Chain
    //   </Text>
    //   <Text className="text-center mt-3 text-5xl font-bold text-merald">
    //     tales
    //   </Text>
    //   <Slogan /> */}
      
    // </View>
  <AuthContext.Provider value={{ user, setUser }}>
    <Stack.Navigator>
      {user ? (
        <>
        <Stack.Screen name="Home" component={HomeScreen}/>
          </>
      ) : (
        <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Create account" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  </AuthContext.Provider>
  );
}

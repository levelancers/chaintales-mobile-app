import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Slogan from './screens/App/Slogan';

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-800 border border-gray-800 rounded">
      <StatusBar style='auto' className="flex flex-row space-x-2" />
      <Text className="text-center mt-3 text-5xl font-bold text-ocean">
        Chain
      </Text>
      <Text className="text-center mt-3 text-5xl font-bold text-merald">
        tales
      </Text>
      <Slogan />
    </View>
  );
}
import React from 'react';
import { View, Text } from 'react-native';

export default function Slogan() {
    return (
        <View className="flex-1 justify-center items-center bg-gray-800 border border-gray-800 rounded">
        <Text className="text-center mt-3 text-5xl font-bold text-blue-400">
        Share your own stories with world!
        </Text>
        </View>
    );
    }
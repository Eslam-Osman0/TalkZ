import { Pressable, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const LoginScreen = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold ">LoginScreen</Text>
      <Pressable
        onPress={() => router.push("/(tabs)/chats")}
        className="bg-green-500 p-4 rounded-full"
      >
        <Text className="text-white font-bold">Login with Google</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginScreen;

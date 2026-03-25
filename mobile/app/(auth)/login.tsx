import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold">LoginScreen</Text>
        <Pressable
          className="bg-primary p-2 rounded-lg"
          onPress={() => router.push("/(tabs)")}
        >
          <Text className="text-white">Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

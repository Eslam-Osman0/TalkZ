import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatsTab = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold">TalkZ</Text>
      </View>
    </SafeAreaView>
  );
};

export default ChatsTab;

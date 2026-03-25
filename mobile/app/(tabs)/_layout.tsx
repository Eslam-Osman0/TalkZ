import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00894C",
        tabBarInactiveTintColor: "#727971",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e5e5e5",
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Ionicons
                name="chatbubble"
                size={size}
                color={color}
              />
            ) : (
              <Ionicons
                name="chatbubble-outline"
                size={size}
                color={color}
                style={{ opacity: 0.5 }}
              />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Ionicons
                name="person"
                size={size}
                color={color}
              />
            ) : (
              <Ionicons
                name="person-outline"
                size={size}
                color={color}
                style={{ opacity: 0.5 }}
              />
            ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

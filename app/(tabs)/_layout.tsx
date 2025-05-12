import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Home, MessagesSquare, RadioIcon, UserIcon } from "lucide-react-native";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabsNavigator = () => {
  const insets = useSafeAreaInsets();

  // Calculate bottom padding based on insets
  const bottomPadding = Math.max(insets.bottom, 10);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 70 + bottomPadding,
            paddingBottom: bottomPadding,
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#eaeaea",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 5,
          },
          tabBarItemStyle: {
            height: 70,
            paddingVertical: Platform.OS === "ios" ? 12 : 8,
          },
        }}
      >
        <Tabs.Screen
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => {
              return (
                <TabItem
                  icon={
                    <Home
                      size={24}
                      color={
                        focused
                          ? Colors.light.tabIconSelected
                          : Colors.light.tabIconDefault
                      }
                    />
                  }
                  title="Home"
                  isFocused={focused}
                />
              );
            },
          }}
          name="home"
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarIcon: ({ focused }) => {
              return (
                <TabItem
                  icon={
                    <MessagesSquare
                      size={24}
                      color={
                        focused
                          ? Colors.light.tabIconSelected
                          : Colors.light.tabIconDefault
                      }
                    />
                  }
                  title="Messages"
                  isFocused={focused}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="broadcast"
          options={{
            title: "Broadcast",
            tabBarIcon: ({ focused }) => {
              return (
                <TabItem
                  icon={
                    <RadioIcon
                      size={24}
                      color={
                        focused
                          ? Colors.light.tabIconSelected
                          : Colors.light.tabIconDefault
                      }
                    />
                  }
                  title="Broadcast"
                  isFocused={focused}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => {
              return (
                <TabItem
                  icon={
                    <UserIcon
                      size={24}
                      color={
                        focused
                          ? Colors.light.tabIconSelected
                          : Colors.light.tabIconDefault
                      }
                    />
                  }
                  title="Profile"
                  isFocused={focused}
                />
              );
            },
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default TabsNavigator;

interface ITabItemProps {
  icon: React.ReactNode;
  title: string;
  isFocused: boolean;
}

const TabItem = ({ icon, isFocused, title }: ITabItemProps) => {
  return (
    <View style={styles.tabItemContainer}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text
        style={[
          styles.tabText,
          {
            color: isFocused
              ? Colors.light.tabIconSelected
              : Colors.light.tabIconDefault,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    fontFamily: "SF_Medium",
    textAlign: "center",
  },
});

import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Home, MessagesSquare, RadioIcon, UserIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabsNavigator = () => {
  const safeArea = useSafeAreaInsets();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="bg-gray-800 flex-1">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              position: "absolute",
              height: "auto",
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: 0,
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
              paddingBottom: safeArea.bottom,
              paddingTop: 16,
              // borderWidth: 1,
              height: "100%",
              display: "flex",
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
      </View>
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
    <View className="items-center justify-center  h-20 ">
      <View style={styles.iconContainer}>{icon}</View>
      {/* <Text
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
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    fontFamily: "SF_Medium",
    textAlign: "center",
  },
});

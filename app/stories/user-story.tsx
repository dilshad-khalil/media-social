import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BadgeCheck, EllipsisVertical, Heart } from "lucide-react-native";
import React from "react";
import { Text, TextInput } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const StoryViewer = () => {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // fallback logic if there's no screen to go back to
      router.replace("/home"); // or any fallback route
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 80) {
        runOnJS(handleBack)();
      }
    })
    .activeOffsetY(20)
    .failOffsetX([-20, 20]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={panGesture}>
        <Box className="flex-1 bg-black w-full">
          <StatusBar style="light" />
          <SafeAreaView className="flex-1 flex-col justify-between">
            <Box className="relative flex-1 mb-3">
              <Box className="absolute top-0 bottom-0 left-0 right-0">
                <Image
                  source={{ uri: "https://picsum.photos/1920/1080" }}
                  contentFit="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                  }}
                />
              </Box>
              <HStack className="p-4 rounded-lg justify-between items-center ">
                <HStack className="items-center" space="md">
                  <Image
                    source={{
                      uri: "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
                    }}
                    alt="PostImage"
                    contentFit="cover"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 200,
                    }}
                  />
                  <VStack>
                    <HStack className="items-center" space="sm">
                      <Text className="text-xl font-SF_Bold text-white">
                        Dilshad Khalil
                      </Text>
                      <BadgeCheck size={16} color={"white"} />
                    </HStack>
                    <Text className="text-white">8 Minutes ago</Text>
                  </VStack>
                </HStack>
                <Box className="p-3 rounded-lg">
                  <EllipsisVertical size={18} color={"white"} />
                </Box>
              </HStack>
            </Box>

            <HStack className="z-10 px-4 mb-4 w-full" space="sm">
              <TextInput
                placeholder="Reply privately..."
                placeholderTextColor={"white"}
                className="flex-1 px-4 rounded-full"
                style={{
                  backgroundColor: "#1c1c1e",
                  height: 46,
                  color: "white",
                }}
              />

              <Box className="p-3 rounded-full">
                <Heart size={18} color={"white"} />
              </Box>
            </HStack>
          </SafeAreaView>
        </Box>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default StoryViewer;

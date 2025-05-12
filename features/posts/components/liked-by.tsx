import { HStack } from "@/components/ui/hstack";
import { Image } from "expo-image";
import React from "react";
import { Text } from "react-native";

const LikedByUsers = () => {
  return (
    <HStack className="border border-gray-100 rounded-full items-center">
      <HStack className="p-1 items-center justify-center">
        <Image
          source={{
            uri: "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
          }}
          alt="Image"
          contentFit="cover"
          style={{
            width: 24,
            height: 24,
            borderRadius: 50,
          }}
        />
        <Image
          source={{
            uri: "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
          }}
          className=""
          alt="Image"
          contentFit="cover"
          style={{
            width: 24,
            height: 24,
            borderRadius: 50,
            transform: [{ translateX: -10 }],
          }}
        />
      </HStack>
      <Text className=" font-SF_Regular text-gray-700 -translate-x-2">
        Liked by Dilshad and Ahmed
      </Text>
    </HStack>
  );
};

export default LikedByUsers;

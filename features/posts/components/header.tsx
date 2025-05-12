import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import UIConstants from "@/constants/Values";
import { Image } from "expo-image";
import { router } from "expo-router";
import { BadgeCheck } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const UserPostHeader = () => {
  return (
    <TouchableOpacity
      activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
      onPress={() => router.push("/user-profile/profile")}
    >
      <HStack className=" items-center" space="md">
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
          <HStack className=" items-center" space="sm">
            <Text className="text-xl font-SF_Bold text-black">
              Erika Holmes
            </Text>
            <BadgeCheck size={18} color={"blue"} />
          </HStack>
          <Text>Erbil</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default UserPostHeader;

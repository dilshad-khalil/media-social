import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import UIConstants from "@/constants/Values";
import { Image } from "expo-image";
import { router } from "expo-router";
import { BadgeCheck } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Post } from "../type";

const UserPostHeader = ({ post }: { post: Post }) => {
  return (
    <TouchableOpacity
      activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
      onPress={() => router.push(`/user-profile/${post.author_id}`)}
    >
      <HStack className="items-center " space="md">
        {post.profile_picture && (
          <Image
            source={{
              uri: post.profile_picture,
            }}
            alt="PostImage"
            contentFit="cover"
            style={{
              width: 42,
              height: 42,
              borderRadius: 200,
            }}
          />
        )}
        <VStack>
          <HStack className="items-center " space="sm">
            <Text className="text-xl text-black font-SF_Bold">
              {post.display_name}
            </Text>
            <BadgeCheck size={18} color={"blue"} />
          </HStack>
          <Text>{post.username}</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default UserPostHeader;

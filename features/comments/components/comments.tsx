import UIConstants from "@/constants/Values";
import { Post } from "@/features/posts/type";
import { router } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Comments = ({ data }: { data: Post }) => {
  return (
    <TouchableOpacity
      activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
      onPress={() => router.push(`/user-comments/${data.id}`)}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <MessageCircle size={24} color="black" />
      <Text className="ml-1 text-base font-SF_Medium">Comments</Text>
    </TouchableOpacity>
  );
};

export default Comments;

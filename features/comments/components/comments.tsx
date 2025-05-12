import UIConstants from "@/constants/Values";
import { router } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Comments = () => {
  return (
    <TouchableOpacity
      activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
      onPress={() => router.push("/comments")}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <MessageCircle size={24} color="black" />
      <Text className="text-base font-SF_Medium ml-1">Comments</Text>
    </TouchableOpacity>
  );
};

export default Comments;

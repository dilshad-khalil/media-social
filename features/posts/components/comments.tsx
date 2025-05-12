import UIConstants from "@/constants/Values";
import { router } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Comments = () => {
  const [comments, setComments] = React.useState(923);
  return (
    <TouchableOpacity
      activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
      onPress={() => router.push("/user-comments/comments")}
      className={`px-3 py-2 border flex-row items-center border-gray-100 rounded-full w-fit gap-1 `}
    >
      <MessageCircle color="black" size={16} />
      <Text className={` font-SF_Medium`}>{comments.toLocaleString()}</Text>
    </TouchableOpacity>
  );
};

export default Comments;

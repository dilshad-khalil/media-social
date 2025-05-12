import UIConstants from "@/constants/Values";
import { Heart } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const LikeButton = () => {
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(207696);
  const handleLike = () => {
    setLiked(!liked);
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
      onPress={handleLike}
      className={`px-3 py-2 border flex-row items-center border-gray-100 rounded-full w-fit gap-1 ${
        liked ? "bg-red-200" : "bg-white"
      }`}
    >
      <Heart color={liked ? "red" : "black"} size={16} />
      <Text
        className={`${liked ? "text-red-500" : "text-black"} font-SF_Medium`}
      >
        {likes.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
};

export default LikeButton;

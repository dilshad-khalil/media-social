import UIConstants from "@/constants/Values";
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LikePost, UnlikePost } from "../api/like-post";
import { Post } from "../type";

const LikeButton = ({ data }: { data: Post }) => {
  const [liked, setLiked] = React.useState(data.likedByCurrentUser);
  const [likes, setLikes] = React.useState(data.likeCount);

  const handleLike = () => {
    if (liked) {
      unlikeMutation.mutate();
      setLikes((prev) => prev - 1);
    } else {
      likeMutation.mutate();
      setLikes((prev) => 1 + prev);
    }
  };

  const likeMutation = useMutation({
    mutationFn: () => LikePost(data.id),
    onSuccess: () => {
      console.log("LIKED");
      setLiked(true);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => UnlikePost(data.id),
    onSuccess: () => {
      console.log("UNLIKED");
      setLiked(false);
    },
  });

  console.log({ liked, likes });

  return (
    <TouchableOpacity
      disabled={likeMutation.isPending || unlikeMutation.isPending}
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

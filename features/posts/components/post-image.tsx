import { Image } from "expo-image";
import React from "react";
import { Dimensions, View } from "react-native";
import { Post } from "../type";

const screenWidth = Dimensions.get("window").width;

const PostImage = ({ data }: { data: Post }) => {
  if (!data) {
    return (
      <View
        style={{
          width: screenWidth,
          height: 400,
          borderRadius: 10,
        }}
      />
    ); // or a placeholder
  }
  return (
    <Image
      source={{
        uri:
          data.PostImage ??
          "https://media.sketchfab.com/models/c9a2c49871b242c7b1a047dad8d9f218/thumbnails/8c9f1533abee403cbf54fe04552239a5/142fe8df1fbc4f9b9175439ce01ff23d.jpeg",
      }}
      alt="PostImage"
      contentFit="cover"
      style={{
        width: "100%",
        height: 400,
        borderRadius: 10,
      }}
    />
  );
};

export default PostImage;

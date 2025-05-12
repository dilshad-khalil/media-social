import { Image } from "expo-image";
import React from "react";

const PostImage = () => {
  return (
    <Image
      source={{
        uri: "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
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

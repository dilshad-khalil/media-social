import React from "react";
import { Text } from "react-native";
import { Post } from "../type";

const Description = ({ data }: { data: Post }) => {
  return <Text className="text-lg font-SF_Medium">{data.content}</Text>;
};

export default Description;

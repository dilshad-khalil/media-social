import UIConstants from "@/constants/Values";
import { Send } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface PostSharesProps {
  onPress: () => void; // Add onPress to trigger modal
}

const PostShares = ({ onPress }: PostSharesProps) => {
  const [shares] = React.useState(431);
  return (
    <TouchableOpacity
      activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
      onPress={onPress} // Use the passed onPress
      className={`px-3 py-2 border flex-row items-center border-gray-100 rounded-full w-fit gap-1 `}
    >
      <Send color="black" size={16} />
      <Text className={`font-SF_Medium`}>{shares.toLocaleString()}</Text>
    </TouchableOpacity>
  );
};

export default PostShares;

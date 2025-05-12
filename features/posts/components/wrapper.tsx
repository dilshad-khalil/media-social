import { HStack } from "@/components/ui/hstack";
import Comments from "./comments";
import LikeButton from "./like-button";
import PostShares from "./post-shares"; // Ensure this path is correct

interface InteractionsButtonsProps {
  onSharePress: () => void;
}

const InteractionsButtons = ({ onSharePress }: InteractionsButtonsProps) => {
  return (
    <HStack space="sm">
      <LikeButton />
      <Comments />
      <PostShares onPress={onSharePress} />
    </HStack>
  );
};

export default InteractionsButtons;

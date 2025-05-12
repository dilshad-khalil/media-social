import { HStack } from "@/components/ui/hstack";
import { Post } from "../type";
import Comments from "./comments";
import LikeButton from "./like-button";

interface InteractionsButtonsProps {
  data: Post;
}

const InteractionsButtons = ({ data }: InteractionsButtonsProps) => {
  return (
    <HStack space="sm">
      <LikeButton data={data} />
      <Comments data={data} />
      {/* <PostShares onPress={onSharePress} /> */}
    </HStack>
  );
};

export default InteractionsButtons;

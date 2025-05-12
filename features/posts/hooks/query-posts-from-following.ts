import getPostsFromFollowing from "@/api/get-posts-from-following";
import { useQuery } from "@tanstack/react-query";

export default function useQueryPostsFromFollowing() {
  const x = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsFromFollowing,
  });

  return x;
}

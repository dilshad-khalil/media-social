import AxiosInstance from "@/axios.config";
import { Post } from "@/features/posts/type";

type Response = {
  data: Post[];
};

export default async function getPostsFromFollowing(): Promise<any> {
  const response = await AxiosInstance.get<Response>("/post/all");
  return response.data;
}

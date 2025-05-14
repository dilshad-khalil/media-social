import AxiosInstance from "@/axios.config";
import { Post } from "@/features/posts/type";

type Response = {
  data: Post[];
};

export async function getPostByAuthor(authorId: string) {
  const response = await AxiosInstance.get<Response>(
    `/post/by-author/${authorId}`
  );
  return response.data;
}

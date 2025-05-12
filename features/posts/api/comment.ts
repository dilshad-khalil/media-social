import AxiosInstance from "@/axios.config";
import { Comment } from "../type";

type Response = {
  data: Comment[];
};
export async function getComments(postId: string) {
  const response = await AxiosInstance.get<Response>(`/comment/${postId}`);
  return response.data;
}

import AxiosInstance from "@/axios.config";

export function LikePost(postId: string) {
  const response = AxiosInstance.post(`/post/${postId}/like`);
  return response;
}

export function UnlikePost(postId: string) {
  const response = AxiosInstance.post(`/post/${postId}/unlike`);
  return response;
}

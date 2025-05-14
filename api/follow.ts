import AxiosInstance from "@/axios.config";

export async function followUser(id: string) {
  const response = await AxiosInstance.post(`/user/follow/${id}`);
  return response;
}

export async function unfollowUser(id: string) {
  const response = await AxiosInstance.post(`/user/unfollow/${id}`);
  return response;
}

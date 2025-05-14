import AxiosInstance from "@/axios.config";

type Response = {
  data: {
    id: string;
    username: string;
    email: string;
    email_verified: boolean;
    phone: string;
    phone_verified: boolean;
    two_factor_enabled: boolean;
    status: number;
    createdAt: string;
    updatedAt: string;
    display_name: string;
    profile_picture: string;
    bio: string;
    gender: 1 | 2;
    date_of_birth: string;
    followersCount: number;
    followingCount: number;
    postsCount: number;
    isFollowing: boolean;
  };
};

export async function getProfile(userId?: string) {
  const response = await AxiosInstance.get<Response>(
    `/user/profile${userId ? `/${userId}` : ""}`
  );
  return response.data;
}

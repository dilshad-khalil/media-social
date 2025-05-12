export type Post = {
  id: string;
  author_id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publicity: number;
  PostImage: string | null;
  authorId: string;
  username: string;
  display_name: string;
  profile_picture: string;
  likeCount: number;
  likedByCurrentUser: boolean;
  commentCount: number;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  post_id: string;
  userId: string;
  username: string;
  profile_picture: null | string;
};

import { NewPost, Post, UpdatePost } from '@/db/schema/post';
import { NewAsset } from '@/db/schema/asset';
import { Draft } from '@/db/schema/draft';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
type fetctParams<T> = {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: T;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
};

const fetcher = async <T, U>({
  url,
  method = 'GET',
  data,
  credentials = 'include',
  headers,
}: fetctParams<T>): Promise<U> => {
  const config: RequestInit = {
    method,
    credentials,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}/${url}`, config);

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};

export const uploadAsset = async (data: NewAsset) => {
  return await fetcher<NewAsset, { success: boolean; id: number }>({
    url: '/api/upload',
    method: 'POST',
    data,
  });
};

export const deleteAsset = async (data: string) => {
  return await fetcher<string, { success: boolean; id: number }>({
    url: '/api/upload',
    method: 'DELETE',
    data,
  });
};

export const deletePost = async (data: string) => {
  return await fetcher<string, { id: number }>({
    url: '/api/posts',
    method: 'DELETE',
    data,
  });
};

export const deletePostAdmin = async (
  url: string,
  { arg }: { arg: { postId: number } },
) => {
  return await fetcher<{ postId: number }, { id: number }>({
    url,
    method: 'DELETE',
    data: arg,
  });
};

export const editPost = async (url: string, { arg }: { arg: UpdatePost }) => {
  return await fetcher<UpdatePost, Post>({
    url,
    method: 'PUT',
    data: arg,
  });
};

export const createPost = async (url: string, { arg }: { arg: NewPost }) => {
  return await fetcher<NewPost, Post>({
    url,
    method: 'POST',
    data: arg,
  });
};

export const toggleFeaturePost = async (
  url: string,
  { arg }: { arg: { postId: number } },
) => {
  return await fetcher<{ postId: number }, { id: number; featured: boolean }>({
    url,
    method: 'PUT',
    data: arg,
  });
};

export const saveDraft = async (
  url: string,
  { arg }: { arg: Partial<NewPost> & { draftToken: string } },
) => {
  return await fetcher<
    Partial<NewPost> & { draftToken: string },
    { draft: Draft; post: Post }
  >({
    url,
    method: 'POST',
    data: arg,
  });
};

export const generatePostContent = async (
  url: string,
  { arg }: { arg: string },
) => {
  return await fetcher<string, { success: boolean; content: string }>({
    url,
    method: 'POST',
    data: arg,
  });
};

// export const updatePost = async (data: Post) => {
//   return await fetcher<Post, { success: boolean; data: Post }>({
//     url: '/api/posts',
//     method: 'PUT',
//     data,
//   });
// };

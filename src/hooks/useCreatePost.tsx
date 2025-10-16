import { createPost } from '@/lib/api';
import { getEditorInstance } from '@/lib/editor';
import { usePostStore } from '@/store/usePost';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useSWRMutation from 'swr/mutation';

export const useCreatePost = () => {
  const resetStore = usePostStore((store) => store.reset);
  const editor = getEditorInstance();
  const router = useRouter();
  const {
    data: createdPost,
    isMutating: isCreatingPost,
    trigger: createPostTrigger,
  } = useSWRMutation('api/posts', createPost, {
    onSuccess: (data) => {
      toast.success('Post created successfully');
      router.push(`/post/${data.slug}`);
      resetStore();
      editor?.commands.clearContent();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createPostTrigger,
    isCreatingPost,
    createdPost,
  };
};

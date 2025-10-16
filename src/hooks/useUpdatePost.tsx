import { editPost } from '@/lib/api';
import { getEditorInstance } from '@/lib/editor';
import { usePostStore } from '@/store/usePost';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useSWRMutation from 'swr/mutation';

export const useUpdatePost = () => {
  const resetStore = usePostStore((store) => store.reset);
  const editor = getEditorInstance();
  const router = useRouter();
  const {
    data: updatedPost,
    isMutating: isUpdatingPost,
    trigger: updatePostTrigger,
  } = useSWRMutation('api/posts/edit', editPost, {
    onSuccess: (data) => {
      toast.success('Post updated successfully');
      router.push(`/post/${data.slug}`);
      resetStore();
      editor?.commands.clearContent();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    updatedPost,
    isUpdatingPost,
    updatePostTrigger,
  };
};

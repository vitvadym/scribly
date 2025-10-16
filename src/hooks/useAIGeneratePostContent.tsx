import { generatePostContent } from '@/lib/api';
import { getEditorInstance } from '@/lib/editor';
import { usePostFormValues } from '@/store/usePost';
import { toast } from 'sonner';
import useSWRMutation from 'swr/mutation';

export const useAIGeneratePostContent = () => {
  const setPostFormValues = usePostFormValues();
  const editor = getEditorInstance();

  const {
    data: generatedContent,
    trigger: generatePostContentTrigger,
    isMutating: isGeneratingPostContent,
    error,
  } = useSWRMutation('api/ai/content', generatePostContent, {
    onSuccess: (data) => {
      editor?.commands.focus('end');
      editor?.commands.insertContent(data.content);

      setPostFormValues({ content: data.content });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    generatePostContentTrigger,
    isGeneratingPostContent,
    generatedContent,
    error,
  };
};

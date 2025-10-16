'use client';
import Editor from '@/components/client/Editor/Editor';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSinglePost } from '@/hooks/useSinglePost';
import { usePostStore } from '@/store/usePost';
import { usePostFormValues } from '@/store/usePost';
import { getEditorInstance } from '@/lib/editor';
import Spinner from '@/components/client/Spinner/Spinner';

export default function EditPostPage() {
  const store = usePostStore();
  const editor = getEditorInstance();
  const setFormValues = usePostFormValues();

  const { slug } = useParams();

  const { data, isLoading } = useSinglePost(slug as string);

  useEffect(() => {
    if (data) {
      editor?.commands.setContent(data.content);
      setFormValues({ ...data });
    }

    return () => {
      store.reset();
      editor?.commands.setContent('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  return <Editor />;
}

// import Editor from '@/components/client/Editor/Editor';
'use client';
import Spinner from '@/components/client/Spinner/Spinner';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/client/Editor/Editor'), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function Write() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return <Editor />;
}

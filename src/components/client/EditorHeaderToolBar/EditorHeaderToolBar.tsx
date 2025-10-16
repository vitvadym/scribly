'use client';
import {
  RollbackOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  CodeOutlined,
  UnderlineOutlined,
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  CommentOutlined,
  FileImageOutlined,
  SaveOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import Button from '../../ui/Button/Button';
import styles from './EditorHeaderToolBar.module.css';
import cn from 'classnames';
import { useScroll } from '@/hooks/useScroll';
import { useEffect } from 'react';
import { saveDraft, uploadAsset } from '@/lib/api';
import { postCreateSchema, postUpdateSchema } from '@/db/schema/post';
import { toast } from 'sonner';
import { useSearchParams, useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { generateDescription } from '@/utils/client-utils';
import Icon from '../../ui/Icon/Icon';
import { CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import CategorySelect from '../CategotySelect/CategorySelect';
import dayjs from 'dayjs';
import { usePostFormValues, usePostStore } from '@/store/usePost';
import { getEditorInstance } from '@/lib/editor';
import { getEditorActions } from '../Editor/editorActions';
import { useAIGeneratePostContent } from '@/hooks/useAIGeneratePostContent';
import { useCreatePost } from '@/hooks/useCreatePost';
import { useUpdatePost } from '@/hooks/useUpdatePost';
import { usePathname } from 'next/navigation';

type HeadingLevel = 1 | 2 | 3;

export default function EditorHeaderToolBar() {
  const editor = getEditorInstance();
  const editorActions = getEditorActions();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isEditing = pathname.includes('edit');
  // editor?.commands.blur()
  const scrollPosition = useScroll();

  const router = useRouter();
  const store = usePostStore();
  const {
    description,
    title,
    category,
    content,
    asset,
    slug,
    reset: resetStore,
  } = store;
  const setPostFormValues = usePostFormValues();

  const {
    generatedContent,
    isGeneratingPostContent,
    generatePostContentTrigger,
  } = useAIGeneratePostContent();

  const { createPostTrigger, isCreatingPost } = useCreatePost();
  const { updatePostTrigger, isUpdatingPost } = useUpdatePost();

  const {
    data: draft,
    trigger: triggerSaveDraft,
    isMutating: isSavingDraft,
  } = useSWRMutation('api/draft', saveDraft);

  const handleGeneratePostContent = async () => {
    if (!title) {
      return toast.error('Enter post title');
    }
    const response = await generatePostContentTrigger(title);

    if (response.success) {
      toast.success('Post content created');
      // editor?.commands.focus();
    }
  };

  useEffect(() => {
    if (editor) {
      const handleUpdate = () => {
        const content = editor.getHTML();
        const textContent = editor.getText();

        const description = generateDescription(textContent);

        setPostFormValues({ content, description });
      };

      editor?.on('update', handleUpdate);
    }

    return () => {
      editor?.commands.clearContent();
      resetStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  useEffect(() => {
    if (isCreatingPost || isGeneratingPostContent || isUpdatingPost) {
      toast.loading('Processing...');
    } else {
      toast.dismiss();
    }
  }, [isCreatingPost, isGeneratingPostContent, isUpdatingPost]);

  if (!editor || !editorActions) {
    return null;
  }

  const {
    handleAddImage,
    isActive,
    undoAction,
    redoAction,
    toggleCodeBlock,
    toggleListBullet,
    toggleListOrdered,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleStrike,
    toggleTextAlignLeft,
    toggleTextAlignCenter,
    toggleTextAlignRight,
    toggleQuote,
  } = editorActions;

  const levels: HeadingLevel[] = [1, 2, 3];

  const handleCreatePost = async () => {
    const post = {
      title,
      slug,
      content,
      description,
      category: category?.value,
      categoryId: category?.id,
      coverImage: asset?.url,
      assetId: asset?.assetId,
    };

    const parsed = postCreateSchema.safeParse(post);

    if (!parsed.success) {
      toast.warning('Please fill all the fields');
      return;
    }

    await createPostTrigger(parsed.data);
  };

  const handleSaveDraft = async () => {
    let draftToken;

    const token = searchParams.get('draft');

    if (!token) {
      draftToken = crypto.randomUUID();
      const params = new URLSearchParams();
      params.set('draft', draftToken);

      router.push(`?${params}`);
    } else {
      draftToken = token;
    }

    const draft = {
      title: title || 'Untitled',
      content: content || '',
      description: description || '',
      slug: slug || '',
      category: category?.value,
      categoryId: category?.id,
      coverImage: asset?.url,
      draftToken,

    };
    await triggerSaveDraft({...draft});
  };

  const handleUpdatePost = async () => {
    const updatedPost = {
      title,
      content,
      description,
      slug,
      category: category?.value,
      categoryId: category?.id,
      coverImage: asset?.url,
      assetPublicId: asset?.publicId,
      assetId: asset?.assetId,
      id: store.id,
    };

    const parsed = postUpdateSchema.safeParse(updatedPost);

    if (!parsed.success) {
      toast.warning('Please fill all the fields');
      return;
    }

    await updatePostTrigger(parsed.data);
  };

  return (
    <div
      className={cn(styles.bar, { [styles.fixedBar]: scrollPosition > 150 })}
    >
      <div className={styles.tools}>
        <Button
          title='Undo'
          variant='icon'
          onClick={undoAction}
          disabled={!editor.can().undo()}
        >
          <RollbackOutlined />
        </Button>

        <Button
          title='Redo'
          variant='icon'
          onClick={redoAction}
          disabled={!editor.can().redo()}
        >
          <RollbackOutlined rotate={180} />
        </Button>
        <Button
          title='Code Block'
          className={cn({ [styles.active]: isActive('codeBlock') })}
          variant='icon'
          onClick={toggleCodeBlock}
        >
          <CodeOutlined />
        </Button>
        {levels.map((level) => (
          <Button
            title={`Heading ${level}`}
            className={cn({
              [styles.active]: isActive('heading', { level }),
            })}
            key={level}
            variant='icon'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
          >
            H{level}
          </Button>
        ))}

        <Button
          title='Bullet List'
          className={cn({ [styles.active]: isActive('bulletList') })}
          variant='icon'
          onClick={toggleListBullet}
        >
          <UnorderedListOutlined />
        </Button>

        <Button
          title='Ordered List'
          className={cn({ [styles.active]: isActive('orderedList') })}
          variant='icon'
          onClick={toggleListOrdered}
        >
          <OrderedListOutlined />
        </Button>

        <Button
          title='Bold'
          className={cn({ [styles.active]: isActive('bold') })}
          variant='icon'
          onClick={toggleBold}
        >
          <BoldOutlined />
        </Button>

        <Button
          title='Italic'
          className={cn({ [styles.active]: isActive('italic') })}
          variant='icon'
          onClick={toggleItalic}
        >
          <ItalicOutlined />
        </Button>

        <Button
          title='Underline'
          className={cn({ [styles.active]: isActive('underline') })}
          variant='icon'
          onClick={toggleUnderline}
        >
          <UnderlineOutlined />
        </Button>

        <Button
          title='Strikethrough'
          className={cn({ [styles.active]: isActive('strike') })}
          variant='icon'
          onClick={toggleStrike}
        >
          <StrikethroughOutlined />
        </Button>

        <Button
          title='Align Left'
          className={cn({
            [styles.active]:
              isActive('paragraph', {
                textAlign: 'left',
              }) ||
              isActive('heading', {
                textAlign: 'left',
              }),
          })}
          variant='icon'
          onClick={toggleTextAlignLeft}
        >
          <AlignLeftOutlined />
        </Button>

        <Button
          title='Align Center'
          className={cn({
            [styles.active]:
              isActive('paragraph', {
                textAlign: 'center',
              }) ||
              isActive('heading', {
                textAlign: 'center',
              }),
          })}
          variant='icon'
          onClick={toggleTextAlignCenter}
        >
          <AlignCenterOutlined />
        </Button>

        <Button
          title='Align Right'
          className={cn({
            [styles.active]:
              isActive('paragraph', {
                textAlign: 'right',
              }) ||
              isActive('heading', {
                textAlign: 'right',
              }),
          })}
          variant='icon'
          onClick={toggleTextAlignRight}
        >
          <AlignRightOutlined />
        </Button>

        <Button
          title='Quote'
          className={cn({ [styles.active]: isActive('blockquote') })}
          variant='icon'
          onClick={toggleQuote}
        >
          <CommentOutlined />
        </Button>
        <Button
          upload
          title='Image'
          variant='icon'
          options={{
            folder: 'posts_images',
            defaultSource: 'local',
            sources: ['google_drive', 'local', 'url', 'image_search'],
            maxFiles: 1,
            clientAllowedFormats: ['jpg', 'png', 'jpeg'],
            autoMinimize: true,
          }}
          signatureEndpoint={`${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-cloudinary-params`}
          onSuccessAction={async (response) => {
            const { info } = response;
            const { asset_id, public_id, secure_url } =
              info as CloudinaryUploadWidgetInfo;

            const asset = {
              publicId: public_id,
              url: secure_url,
              assetId: asset_id,
            };

            handleAddImage(secure_url, public_id);
            await uploadAsset(asset);
            setPostFormValues({ asset });
          }}
        >
          <FileImageOutlined />
        </Button>

        <Button
          title='Generate post content'
          variant='icon'
          onClick={handleGeneratePostContent}
          disabled={isGeneratingPostContent || generatedContent?.success}
        >
          <Icon
            animate={isGeneratingPostContent}
            path='/gemini.svg'
          />
        </Button>

        <Button
          onClick={handleSaveDraft}
          title='Save draft'
          variant='icon'
        >
          {isSavingDraft ? <LoadingOutlined spin /> : <SaveOutlined />}
        </Button>
        <span className={styles.saveInfo}>
          {draft?.draft
            ? `saved at ${dayjs(draft.draft.updatedAt).format('HH:mm')}`
            : 'No draft saved'}
        </span>

        <CategorySelect />
      </div>
      <div className={styles.publish}>
        <Button
          disabled={editor.isEmpty}
          onClick={isEditing ? handleUpdatePost : handleCreatePost}
        >
          {isEditing ? 'Update' : 'Publish'}
        </Button>
      </div>
    </div>
  );
}

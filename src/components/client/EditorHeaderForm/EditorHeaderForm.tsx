'use client';
import { useEffect } from 'react';
import styles from './EditorHeaderForm.module.css';
import { UploadOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Button from '../../ui/Button/Button';
import Input from 'rc-input';
import { useCreatePostContext } from '@/context/CreatePostContext';
import {
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import slugify from 'slugify';
import { toast } from 'sonner';

import { deleteAsset, uploadAsset } from '@/lib/api';

export default function EditorHeaderForm() {
  const { setPostFormValues, title, asset } = useCreatePostContext();

  useEffect(() => {
    if (asset?.url) {
      setPostFormValues((prevForm) => ({
        ...prevForm,
        asset,
      }));
    }
    // eslint-disable-next-line
  }, [asset]);

  const handleDeleteImage = async () => {
    const confirm = window.confirm('Delete post image ?');

    if (asset && confirm) {
      toast.promise(deleteAsset(asset.publicId), {
        loading: 'Processing',
        success: (data) => {
          if (data.success) {
            setPostFormValues((prevForm) => ({
              ...prevForm,
              asset: null,
            }));
          }
          return 'Image deleted';
        },
        error: 'Failed to delete image',
      });
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setPostFormValues((prevForm) => ({
      ...prevForm,
      title,
      slug: slugify(title, { lower: true, trim: true, strict: true }),
    }));
  };

  return (
    <PhotoProvider>
      <div className={styles.container}>
        <div className={styles.postMeta}>
          <div className={styles.formInput}>
            <Input
              title='Post title'
              className={styles.input}
              placeholder='Post title'
              value={title}
              onChange={handleChangeTitle}
              name='title'
            />
          </div>
        </div>
        {!asset?.publicId && (
          <Button
            upload
            options={{
              folder: 'posts_images',
              defaultSource: 'local',
              sources: ['google_drive', 'local', 'url', 'image_search'],
              maxFiles: 1,
              clientAllowedFormats: ['jpg', 'png', 'jpeg'],
            }}
            icon={UploadOutlined}
            signatureEndpoint={`${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-cloudinary-params`}
            onSuccessAction={async (result: CloudinaryUploadWidgetResults) => {
              const { secure_url, public_id, asset_id } =
                result.info as CloudinaryUploadWidgetInfo;

              const asset = {
                publicId: public_id,
                url: secure_url,
                assetId: asset_id,
              };

              await uploadAsset(asset);

              setPostFormValues((prevForm) => ({
                ...prevForm,
                asset,
              }));
              toast.success('Image uploaded');
            }}
          >
            Upload image
          </Button>
        )}

        {asset?.url && (
          <>
            <PhotoView
              key={asset?.url}
              src={asset?.url}
            >
              <Button icon={EyeOutlined}>Post image</Button>
            </PhotoView>
            <Button
              onClick={handleDeleteImage}
              title='Delete image'
            >
              <DeleteOutlined />
            </Button>
          </>
        )}
      </div>
    </PhotoProvider>
  );
}

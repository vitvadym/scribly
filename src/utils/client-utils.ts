import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { type JSONContent } from '@tiptap/react';
import slugify from 'slugify';
dayjs.extend(relativeTime);

export const generateDescription = (
  content: string,
  maxLength = 120,
): string => {
  const withoutImages = content.replace(/<img[^>]*>/gi, '');
  const clean = withoutImages.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();

  return clean.length <= maxLength
    ? clean
    : clean.slice(0, maxLength).replace(/\s+\S*$/, '');
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const fromNow = (date: Date) => {
  return dayjs(date).fromNow();
};

export const formatDate = (date: Date) => {
  return dayjs(date).format('DD-MM-YYYY');
};

export const formatJsonEditorContent = (json: JSONContent) => {
  const filtered = json.content?.filter((node) => node.type !== 'image');

  return {
    ...json,
    content: filtered,
  };
};

export const getPostTitle = (json: JSONContent) => {
  const titleNode = json.content?.find(
    (node) =>
      (node.type === 'heading' && node?.attrs?.level === 1) ||
      node?.attrs?.level === 2,
  );
  return titleNode ? titleNode?.content?.[0]?.text : '';
};

export const setSlug = (title: string) => {
  if (!title) return '';
  return slugify(title, { lower: true, strict: true, trim: true });
};

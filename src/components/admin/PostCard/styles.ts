import { CardRootProps, IconButtonProps, BoxProps } from '@chakra-ui/react';

export const cardProps: CardRootProps = {
  _hover: {
    shadow: 'lg',
  },
  transition: 'box-shadow 0.2s ease-in-out',
  maxW: 'sm',
  overflow: 'hidden',
  shadow: 'md',
  p: 4,
};

export const toggleFeaturedButtonProps: IconButtonProps = {
  title: 'Featured',
  position: 'absolute',
  right: 5,
  top: 5,
  backgroundColor: 'teal',
};

export const deleteButtonProps: IconButtonProps = {
  title: 'Featured',
  position: 'absolute',
  left: 5,
  top: 5,
  backgroundColor: 'teal',
};

export const imageWrapperProps: BoxProps = {
  position: 'relative',
  h: '200px',
  overflow: 'hidden',
  mb: 2,
};

export const starIconProps = {
  color: 'yellow',
}

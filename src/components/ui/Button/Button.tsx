import cn from 'classnames';
import styles from './Button.module.css';
import React from 'react';
import { CldUploadButton, type CldUploadButtonProps } from 'next-cloudinary';

type ButtonProps = {
  className?: string;
  fixedWidth?: boolean;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'icon';
  upload?: boolean;
  icon?: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  CldUploadButtonProps;

export default function Button({
  children,
  variant = 'default',
  active = false,
  upload = false,
  fixedWidth = false,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const btnClass = cn(
    styles.btn,
    styles[variant],
    { [styles.active]: active },
    className,
  );

  if (upload) {
    return (
      <CldUploadButton
        {...props}
        className={btnClass}
      >
        {icon ? (
          <span className={styles.withIcon}>
            <span>{children}</span>
            <span className={styles.svgIcon}>{React.createElement(icon)}</span>
          </span>
        ) : (
          children
        )}
      </CldUploadButton>
    );
  }

  return (
    <button
      disabled={disabled}
      {...props}
      className={cn(
        styles.btn,
        styles[variant],
        { [styles.active]: active, [styles.fixedWidth]: fixedWidth },
        className,
      )}
    >
      {icon ? (
        <span className={styles.withIcon}>
          <span>{children}</span>
          <span className={styles.svgIcon}>{React.createElement(icon)}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

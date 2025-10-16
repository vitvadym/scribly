import React from 'react';
import Image from 'next/image';
import styles from './Icon.module.css';
import cn from 'classnames';

type IconProps = {
  path: string;
  animate?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function Icon({ path, animate = false, ...props }: IconProps) {
  return (
    <span
      className={styles.icon}
      {...props}
    >
      <Image
        className={cn({ [styles.animate]: animate })}
        src={path}
        alt='icon'
        width={20}
        height={20}
      />
    </span>
  );
}

import { CloseOutlined } from '@ant-design/icons';
import Button from '../Button/Button';
import styles from './Modal.module.css';
import cn from 'classnames';

export default function Modal({
  children,
  onClose,
  ...props
}: {
  children: React.ReactNode;
  onClose: () => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(styles.overlay, props.className)}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className={styles.closeButton}
          onClick={onClose}
        >
          <CloseOutlined />
        </Button>
        {children}
      </div>
    </div>
  );
}

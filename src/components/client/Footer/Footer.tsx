import { FOOTER_LINKS } from '@/constansts/constants';
import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.description}>
            <h2>Scribbly</h2>
            <p>Where ideas go to scribble and shine</p>
          </div>
        </div>

        <nav className={styles.links}>
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.name}
              href='#'
            >
              {link.name}
            </Link>
          ))}
        </nav>

      </div>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Scribbly. All rights reserved.
        </p>
    </footer>
  );
}

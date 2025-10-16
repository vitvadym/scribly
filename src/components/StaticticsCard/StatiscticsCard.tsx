import React from 'react';
import styles from './StatisticsCard.module.css';

export default function StatiscticsCard({
  title,
  value,
  color,
  icon,
  size
}: {
  title: string;
  value: number;
  color?: string;
  size?: number
  icon: React.ElementType;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer} style={{ backgroundColor: `${color}10`, color }}>
        {React.createElement(icon, { style: { color, fontSize: size } })}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>

      </div>
    </div>
  );
}

'use client';

import { useReveal } from '@/hooks/useReveal';
import styles from './RevealProvider.module.css';

export default function RevealProvider(props: { children: React.ReactNode }) {
  useReveal();
  return <div className={styles['reveal-provider-wrapper']}>{props.children}</div>;
}

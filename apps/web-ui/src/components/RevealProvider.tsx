'use client';

import { useReveal } from '@/hooks/useReveal';
import styles from './RevealProvider.module.css';
import { csn } from '@/utils/class.utils';

interface RevealProviderProps {
  children: React.ReactNode;
  rootClassName?: string;
}
export default function RevealProvider(props: RevealProviderProps) {
  useReveal();
  return (
    <div className={csn(styles['reveal-provider-wrapper'], props.rootClassName)}>
      {props.children}
    </div>
  );
}

'use client';

import { useReveal } from '@/hooks/useReveal';
import { csn } from '@/utils/class.utils';
import React from 'react';
import styles from './RevealProvider.module.css';

interface RevealProviderProps {
  children: React.ReactNode;
  rootClassName?: string;
}
export default function RevealProvider(props: RevealProviderProps): React.ReactElement {
  useReveal();
  return (
    <div className={csn(styles['reveal-provider-wrapper'], props.rootClassName)}>
      {props.children}
    </div>
  );
}

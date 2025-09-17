'use client';

import { csn } from '@/utils/class.utils';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const HIDE_THRESHOLD = 100;

export default function Header(props: HeaderProps): React.ReactElement {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const hasToBeHidden = needToHide(lastScrollY);
      if (isHidden !== hasToBeHidden) setIsHidden(hasToBeHidden);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHidden, lastScrollY]);

  return (
    <header className={csn(styles.header, isHidden && styles.hidden, props.className)}>
      {props.children}
    </header>
  );
}

function needToHide(lastScrollY: number): boolean {
  return window.scrollY > lastScrollY && window.scrollY > HIDE_THRESHOLD;
}

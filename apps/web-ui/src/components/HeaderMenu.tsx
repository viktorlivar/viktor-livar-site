'use client';

import { csn } from '@/utils/class.utils';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './HeaderMenu.module.css';

interface HeaderProps {
  children: React.ReactNode;
  rootClassName?: string;
  rootMenuClassName?: string;
}

export default function HeaderMenu(props: HeaderProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    setIsOpen((prev) => !prev);
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const handleCatchClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (!isOpen) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className={props.rootClassName} onClick={handleCatchClick}>
      <button className={csn(styles.button)} onClick={handleClick}>
        <Image src="/icons/header-menu.svg" alt="menu" width={36} height={36} />
      </button>

      <div className={csn(props.rootMenuClassName, !isOpen ? styles['menu-closed'] : null)}>
        {props.children}
      </div>
    </div>
  );
}

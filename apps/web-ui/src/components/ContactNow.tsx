'use client';

import { csn } from '@/utils/class.utils';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ContactNow.module.css';

type ContactNowProps = {
  label: string;
  buttonClassName?: string;
};

export default function ContactNow(props: ContactNowProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={props.buttonClassName}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {props.label}
      </button>

      {open ? <Dialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}
const ESCAPE_KEY = 'Escape';

function Dialog({ onClose }: { onClose: () => void }): React.ReactElement {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === ESCAPE_KEY) onClose();
    };

    const handleMouseDown = (e: MouseEvent): void => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHtmlScrollbarGutter = document.documentElement.style.scrollbarGutter;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'stable';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.documentElement.style.scrollbarGutter = prevHtmlScrollbarGutter;
    };
  }, [onClose]);

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Contact Now" className={styles.backdrop}>
      <div ref={panelRef} className={styles['dialog-root']}>
        <h3>Contact With Viktor Now</h3>
        <Form onDone={onClose} />
        <button onClick={onClose} className={styles['close-button']}>
          <Image src="/icons/close.svg" alt="close" width={18} height={18} />
        </button>
      </div>
    </div>,
    document.body,
  );
}

function Form({ onDone }: { onDone: () => void }): React.ReactElement {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  const submit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(
        'https://kq7oy8tm7f.execute-api.us-east-1.amazonaws.com/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, message }),
        },
      );
      if (!res.ok) throw new Error();
      setStatus('ok');
      // Small delay so user sees success, then close
      setTimeout(onDone, 1200);
    } catch {
      setStatus('err');
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={submit} className={styles.form}>
      <label className={styles.label}>
        <div>Your Email</div>
        <input
          className={styles['input']}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className={styles.label}>
        <div>Your Message</div>
        <textarea
          className={csn(styles['message-input'], styles['input'])}
          required
          minLength={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <button className={styles['send-button']} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send'}
      </button>

      {status === 'ok' && (
        <p className={styles['centered-text']}>
          Thanks. <br />
          Viktor typically responds within 24 hours.
        </p>
      )}
      {status === 'err' && (
        <p className={styles['centered-text']}>
          Something went wrong. Please email{' '}
          <a href="mailto:viktor.livar.o@gmail.com">viktor.livar.o@gmail.com</a>.
        </p>
      )}
    </form>
  );
}

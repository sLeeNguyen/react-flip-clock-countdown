import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';
import { Digit, FlipClockCountdownProps } from './types';

export interface FlipClockDigitProps {
  current: Digit;
  next: Digit;
  ready?: boolean;
  className?: string;
  style?: FlipClockCountdownProps['digitBlockStyle'];
}

type FlipClockDigitState = {
  current: Digit;
  next: Digit;
};

export default function FlipClockDigit(props: FlipClockDigitProps) {
  const { current, next, className, ready, style } = props;
  const [digit, setDigit] = React.useState<FlipClockDigitState>({ current, next });
  const [flipped, setFlipped] = React.useState(false);

  React.useEffect(() => {
    if (!ready) {
      setDigit({ current, next });
      setFlipped(false);
      return;
    }
    if (digit.current !== current) {
      if (digit.current === digit.next) {
        setDigit({ ...digit, next });
      }
      setFlipped(true);
    } else {
      setFlipped(false);
    }
  }, [current, next]);

  const handleTransitionEnd = (): void => {
    setDigit({ current, next });
    setFlipped(false);
  };

  return (
    <div
      className={clsx('fcc__digit_block', styles.fcc__digit_block, className)}
      style={style}
      suppressHydrationWarning
    >
      <div className={styles.fcc__next_above}>{digit.next}</div>
      <div className={styles.fcc__current_below}>{digit.current}</div>
      <div className={clsx(styles.fcc__card, { [styles.fcc__flipped]: flipped })} onTransitionEnd={handleTransitionEnd}>
        <div className={clsx(styles.fcc__card_face, styles.fcc__card_face_front)}>{digit.current}</div>
        <div className={clsx(styles.fcc__card_face, styles.fcc__card_face_back)}>{digit.next}</div>
      </div>
    </div>
  );
}

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { calcTimeDelta, FlipClockCountdownUnitTimeFormatted, parseTimeDelta } from './utils';
import styles from './styles.module.css';
import FlipClockDigit from './FlipClockDigit';

export interface FlipClockCountdownTimeDelta {
  readonly total: number;
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

export interface FlipClockCountdownState {
  readonly timeDelta: FlipClockCountdownTimeDelta;
  readonly completed: boolean;
}

export type FlipClockCountdownTimeDeltaFn = (props: FlipClockCountdownState) => void;

export interface FlipClockCountdownProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  readonly to: Date | number | string;
  /**
   * @deprecated
   */
  readonly containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  readonly onComplete: () => void;
  readonly onTick: FlipClockCountdownTimeDeltaFn;
}

export interface FlipClockCountdownTimeDeltaFormatted {
  readonly days: FlipClockCountdownUnitTimeFormatted;
  readonly hours: FlipClockCountdownUnitTimeFormatted;
  readonly minutes: FlipClockCountdownUnitTimeFormatted;
  readonly seconds: FlipClockCountdownUnitTimeFormatted;
}

export interface FlipClockCountdownRenderProps extends FlipClockCountdownTimeDelta {
  readonly formatted: FlipClockCountdownTimeDeltaFormatted;
}

/**
 * A 3D animated flip clock countdown component for React.
 */
function FlipClockCountdown(props: FlipClockCountdownProps) {
  const { to, className, children, onComplete, onTick, ...other } = props;
  const [state, setState] = React.useState<FlipClockCountdownState>(constructState);
  const countdownRef = React.useRef(0);

  function clearTimer() {
    window.clearInterval(countdownRef.current);
  }

  function constructState(): FlipClockCountdownState {
    const timeDelta = calcTimeDelta(to);
    return {
      timeDelta,
      completed: timeDelta.total === 0
    };
  }

  function tick() {
    const newState = constructState();
    setState(newState);
    onTick(newState);
    if (newState.completed) {
      clearTimer();
      onComplete();
    }
  }

  React.useEffect(() => {
    clearTimer();
    countdownRef.current = window.setInterval(tick, 1000);

    return () => clearTimer();
  }, [to]);

  const renderProps = useMemo<FlipClockCountdownRenderProps>(() => {
    const { timeDelta } = state;
    return {
      ...timeDelta,
      formatted: parseTimeDelta(timeDelta)
    };
  }, [state]);

  if (state?.completed) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  const { days, hours, minutes, seconds } = renderProps.formatted;
  const labels = ['days', 'hours', 'minutes', 'seconds'];

  return (
    <div {...other} className={clsx(styles.fcc__container, className)}>
      {[days, hours, minutes, seconds].map((item, idx) => {
        return (
          <React.Fragment key={`digit-block-${idx}`}>
            <div className={styles.fcc__digit_block_container}>
              <div className={styles.fcc__digit_block_label}>{labels[idx]}</div>
              {item.current.map((cItem, cIdx) => (
                <FlipClockDigit key={cIdx} current={cItem} next={item.next[cIdx]} />
              ))}
            </div>
            {idx < 3 && <div className={styles.fcc__colon}>:</div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

FlipClockCountdown.defaultProps = {
  onComplete: () => {},
  onTick: () => {}
};

export default FlipClockCountdown;

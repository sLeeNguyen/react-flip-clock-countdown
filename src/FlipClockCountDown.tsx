import clsx from 'clsx';
import React from 'react';
import FlipClockDigit from './FlipClockDigit';
import styles from './styles.module.css';
import { FlipClockCountdownProps, FlipClockCountdownRenderProps, FlipClockCountdownState } from './typings';
import { calcTimeDelta, parseTimeDelta } from './utils';

/**
 * A 3D animated flip clock countdown component for React.
 */
function FlipClockCountdown(props: FlipClockCountdownProps) {
  const { to, className, children, onComplete, onTick, ...other } = props;
  const [state, setState] = React.useState<FlipClockCountdownState>();
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
    setState(constructState());
    clearTimer();
    countdownRef.current = window.setInterval(tick, 1000);

    return () => clearTimer();
  }, [to]);

  const renderProps = React.useMemo<FlipClockCountdownRenderProps | undefined>(() => {
    if (state === undefined) return undefined;

    const { timeDelta } = state;
    return {
      ...timeDelta,
      formatted: parseTimeDelta(timeDelta)
    };
  }, [state]);

  if (state === undefined || renderProps === undefined) return null;

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

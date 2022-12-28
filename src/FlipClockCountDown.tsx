import styles from './styles.module.css';
//
import clsx from 'clsx';
import React from 'react';
import FlipClockDigit from './FlipClockDigit';
import { FlipClockCountdownProps, FlipClockCountdownState, FlipClockCountdownUnitTimeFormatted } from './types';
import { calcTimeDelta, convertToPx, parseTimeDelta } from './utils';

/**
 * A 3D animated flip clock countdown component for React.
 */
function FlipClockCountdown(props: FlipClockCountdownProps) {
  const {
    to,
    className,
    style,
    children,
    onComplete,
    onTick,
    showLabels,
    showSeparators,
    labels,
    labelStyle,
    digitBlockStyle,
    separatorStyle,
    dividerStyle,
    duration,
    renderMap,
    ...other
  } = props;
  // we don't immediately construct the initial state here because it might
  // lead to some bugs with server-side rendering and hydration.
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

  const containerStyles = React.useMemo<React.CSSProperties>(() => {
    const s = {
      '--fcc-flip-duration': duration === undefined || duration < 0 || duration > 1 ? undefined : `${duration}s`,
      '--fcc-digit-block-width': convertToPx(digitBlockStyle?.width),
      '--fcc-digit-block-height': convertToPx(digitBlockStyle?.height),
      '--fcc-shadow': digitBlockStyle?.boxShadow,
      '--fcc-digit-font-size': convertToPx(digitBlockStyle?.fontSize),
      '--fcc-digit-color': digitBlockStyle?.color,
      '--fcc-label-font-size': convertToPx(labelStyle?.fontSize),
      '--fcc-label-color': labelStyle?.color,
      '--fcc-divider-color': dividerStyle?.color,
      '--fcc-divider-height': convertToPx(dividerStyle?.height),
      '--fcc-background': digitBlockStyle?.background || digitBlockStyle?.backgroundColor,
      '--fcc-separator-size': convertToPx(separatorStyle?.size),
      '--fcc-separator-color': showSeparators ? separatorStyle?.color : 'transparent',
      ...style
    };

    return s;
  }, [style, digitBlockStyle, labelStyle, duration, dividerStyle, separatorStyle, showSeparators]);

  const _digitBlockStyle = React.useMemo(() => {
    if (digitBlockStyle) {
      return {
        ...digitBlockStyle,
        background: undefined,
        backgroundColor: undefined,
        width: undefined,
        height: undefined,
        boxShadow: undefined,
        fontSize: undefined,
        color: undefined
      };
    }
    return undefined;
  }, [digitBlockStyle]);

  const sections = React.useMemo(() => {
    if (state === undefined) return undefined;
    const formatted = parseTimeDelta(state.timeDelta);
    const _renderMap = renderMap.length >= 4 ? renderMap.slice(0, 4) : [true, true, true, true];
    const _labels = labels.length >= 4 ? labels.slice(0, 4) : ['Days', 'Hours', 'Minutes', 'Seconds'];
    const times = Object.values(formatted) as FlipClockCountdownUnitTimeFormatted[];
    const r: [FlipClockCountdownUnitTimeFormatted, string][] = [];
    _renderMap.forEach((show, i) => {
      if (show) {
        r.push([times[i], _labels[i]]);
      }
    });
    return r;
  }, [renderMap, state]);

  if (state === undefined || sections === undefined) return <React.Fragment></React.Fragment>;

  if (state?.completed) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <div
      {...other}
      className={clsx(
        styles.fcc__container,
        {
          [styles.fcc__label_show]: showLabels
        },
        className
      )}
      style={containerStyles}
      data-testid='fcc-container'
    >
      {sections.map(([item, label], idx) => {
        return (
          <React.Fragment key={`digit-block-${idx}`}>
            <div className={styles.fcc__digit_block_container}>
              {showLabels && (
                <div className={styles.fcc__digit_block_label} style={labelStyle}>
                  {label}
                </div>
              )}
              {item.current.map((cItem, cIdx) => (
                <FlipClockDigit key={cIdx} current={cItem} next={item.next[cIdx]} style={_digitBlockStyle} />
              ))}
            </div>
            {idx < sections.length - 1 && <div className={styles.fcc__colon}></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

FlipClockCountdown.defaultProps = {
  onComplete: () => {},
  onTick: () => {},
  labels: ['Days', 'Hours', 'Minutes', 'Seconds'],
  renderMap: [true, true, true, true],
  showLabels: true,
  showSeparators: true
};

export default FlipClockCountdown;

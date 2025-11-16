import styles from './styles.module.css';
//
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import FlipClockDigit from './FlipClockDigit';
import {
  FlipClockCountdownProps,
  FlipClockCountdownState,
  FlipClockCountdownUnitTimeFormatted,
  FlipClockCountdownLabel
} from './types';
import { calcTimeDelta, convertToPx, parseTimeDelta } from './utils';

const defaultRenderMap = [true, true, true, true];
const defaultLabels = ['Days', 'Hours', 'Minutes', 'Seconds'];

/**
 * A 3D animated flip clock countdown component for React.
 */
function FlipClockCountdown(props: FlipClockCountdownProps) {
  const {
    to,
    daysInHours = false,
    now = Date.now,
    className,
    style,
    children,
    onComplete = () => {},
    onTick = () => {},
    showLabels = true,
    showSeparators = true,
    labels = defaultLabels,
    labelStyle,
    digitBlockStyle,
    separatorStyle,
    dividerStyle,
    duration = 0.7,
    renderMap = defaultRenderMap,
    hideOnComplete = true,
    stopOnHiddenVisibility = false,
    renderOnServer = false,
    spacing,
    ...other
  } = props;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [state, setState] = React.useState<FlipClockCountdownState>(() => ({
    timeDelta: calcTimeDelta(0, now()),
    completed: false
  }));
  const [isRealState, setIsRealState] = useState(renderOnServer);
  const [isTransitionReady, setIsTransitionReady] = useState(false);
  const countdownRef = React.useRef(0);

  function clearTimer() {
    window.clearInterval(countdownRef.current);
  }

  function constructState(): FlipClockCountdownState {
    const timeDelta = calcTimeDelta(to, now());
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

    if (!isRealState) {
      setIsRealState(true);
    }
    if (!isTransitionReady) {
      window.setTimeout(() => setIsTransitionReady(true), 900);
    }
  }

  const tickRef = useRef(tick);
  tickRef.current = tick;

  useEffect(() => {
    let clearFn: () => void = () => {};
    if (stopOnHiddenVisibility) {
      const visibilityChangeHandler = () => {
        if (document.visibilityState === 'visible') {
          tickRef.current();
          countdownRef.current = window.setInterval(() => tickRef.current(), 1000);
        } else {
          clearTimer();
        }
      };
      visibilityChangeHandler();
      document.addEventListener('visibilitychange', visibilityChangeHandler);
      clearFn = () => {
        clearTimer();
        document.removeEventListener('visibilitychange', visibilityChangeHandler);
      };
    } else {
      clearTimer();
      tickRef.current();
      countdownRef.current = window.setInterval(() => tickRef.current(), 1000);
      clearFn = () => {
        clearTimer();
      };
    }

    return clearFn;
  }, [to, stopOnHiddenVisibility]);

  const containerStyles = useMemo<React.CSSProperties>(() => {
    const s = {
      '--fcc-flip-duration': `${duration}s`,
      '--fcc-spacing': convertToPx(spacing?.clock),
      '--fcc-digit-block-width': convertToPx(digitBlockStyle?.width),
      '--fcc-digit-block-height': convertToPx(digitBlockStyle?.height),
      '--fcc-digit-block-radius': convertToPx(digitBlockStyle?.borderRadius),
      '--fcc-digit-block-spacing': convertToPx(spacing?.digitBlock),
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
  }, [style, digitBlockStyle, labelStyle, duration, dividerStyle, separatorStyle, showSeparators, spacing]);

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
        color: undefined,
        borderRadius: undefined
      };
    }
    return undefined;
  }, [digitBlockStyle]);

  const sections = React.useMemo(() => {
    const formatted = parseTimeDelta(state.timeDelta, daysInHours);
    const _renderMap = renderMap.length >= 4 ? renderMap.slice(0, 4) : defaultRenderMap;
    if (daysInHours) {
      _renderMap[0] = false; // Hide days if daysInHours is true
    }
    const _labels = labels.length >= 4 ? labels.slice(0, 4) : defaultLabels;
    const times = Object.values(formatted) as FlipClockCountdownUnitTimeFormatted[];
    const keys = ['day', 'hour', 'minute', 'second'];
    return _renderMap
      .map<[boolean, string, FlipClockCountdownUnitTimeFormatted, FlipClockCountdownLabel]>((show, i) => {
        return [show, keys[i], times[i], _labels[i]];
      })
      .filter((item) => item[0]);
  }, [labels, renderMap, state]);

  if (state?.completed && hideOnComplete) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  if (!isRealState) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <div
      {...other}
      className={clsx(
        'fcc',
        styles.fcc__container,
        {
          [styles.fcc__label_show]: showLabels
        },
        className
      )}
      style={containerStyles}
      data-testid='fcc-container'
    >
      {sections.map(([render, key, item, label], idx) => {
        if (!render) return null;
        return (
          <React.Fragment key={key}>
            <div className={`fcc__unit_time fcc__unit_time--${key} ${styles.fcc__digit_block_container}`}>
              {showLabels && (
                <div className={`fcc__label fcc__label--${key} ${styles.fcc__digit_block_label}`} style={labelStyle}>
                  {label}
                </div>
              )}
              {item.current.map((cItem, cIdx) => (
                <FlipClockDigit
                  key={cIdx}
                  current={cItem}
                  next={item.next[cIdx]}
                  style={_digitBlockStyle}
                  className={`fcc__digit_block--${key}`}
                  ready={isTransitionReady}
                />
              ))}
            </div>
            {idx < sections.length - 1 && <div className={`fcc__separator ${styles.fcc__colon}`}></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default FlipClockCountdown;

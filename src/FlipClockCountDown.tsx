import clsx from 'clsx';
import React, { forwardRef, useImperativeHandle } from 'react';
import FlipClockDigit from './FlipClockDigit';
import styles from './styles.module.css';
import {
  FlipClockCountdownProps,
  FlipClockCountdownState,
  FlipClockCountdownUnitTimeFormatted,
  FlipClockRefType
} from './types';
import { calcTimeDelta, convertToPx, parseTimeDelta } from './utils';

const defaultRenderMap = [true, true, true, true];
const defaultLabels = ['Days', 'Hours', 'Minutes', 'Seconds'];

/**
 * A 3D animated flip clock countdown component for React.
 */
const FlipClockCountdown: React.ForwardRefRenderFunction<FlipClockRefType, FlipClockCountdownProps> = (props, ref) => {
  const {
    to,
    className,
    style,
    children,
    onComplete = () => {},
    onTick = () => {},
    controls = false,
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
    ...other
  } = props;
  const [end, setEnd] = React.useState<string | number | Date>(to);
  const [status, setStatus] = React.useState<'running' | 'stopped'>(controls ? 'stopped' : 'running');
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [state, setState] = React.useState<FlipClockCountdownState>(constructState);
  const countdownRef = React.useRef(0);

  function clearTimer() {
    window.clearInterval(countdownRef.current);
  }

  function constructState(): FlipClockCountdownState {
    const timeDelta = calcTimeDelta(end);
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

  function stop() {
    if (controls) {
      setStatus('stopped');
      clearTimer();
    }
  }

  function run() {
    if (controls && status === 'stopped') {
      setEnd(state.timeDelta.total * 1000 + new Date().getTime());
      setStatus('running');
    }
  }

  useImperativeHandle(ref, () => ({ stop, run }), [state, status]);

  React.useEffect(() => {
    clearTimer();
    if ((controls && status === 'running') || !controls) {
      countdownRef.current = window.setInterval(tick, 1000);
    }
    return () => clearTimer();
  }, [end]);

  React.useEffect(() => {
    if (controls) {
      setStatus('stopped');
    }
    setEnd(to);
    setTimeout(() => tick(), 0);
  }, [to]);

  const containerStyles = React.useMemo<React.CSSProperties>(() => {
    const s = {
      '--fcc-flip-duration': `${duration}s`,
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
    const formatted = parseTimeDelta(state.timeDelta);
    const _renderMap = renderMap.length >= 4 ? renderMap.slice(0, 4) : defaultRenderMap;
    const _labels = labels.length >= 4 ? labels.slice(0, 4) : defaultLabels;
    const times = Object.values(formatted) as FlipClockCountdownUnitTimeFormatted[];
    const r: [FlipClockCountdownUnitTimeFormatted, string][] = [];
    _renderMap.forEach((show, i) => {
      if (show) {
        r.push([times[i], _labels[i]]);
      }
    });
    return r;
  }, [renderMap, state]);

  if (state?.completed && hideOnComplete) {
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
};

export default forwardRef(FlipClockCountdown);

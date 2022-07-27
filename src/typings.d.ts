export type Digit = number | string;

export interface FlipClockCountdownUnitTimeFormatted {
  readonly current: Digit[];
  readonly next: Digit[];
}

export interface FlipClockCountdownTimeDeltaFormatted {
  readonly days: FlipClockCountdownUnitTimeFormatted;
  readonly hours: FlipClockCountdownUnitTimeFormatted;
  readonly minutes: FlipClockCountdownUnitTimeFormatted;
  readonly seconds: FlipClockCountdownUnitTimeFormatted;
}

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

export interface FlipClockCountdownRenderProps extends FlipClockCountdownTimeDelta {
  readonly formatted: FlipClockCountdownTimeDeltaFormatted;
}

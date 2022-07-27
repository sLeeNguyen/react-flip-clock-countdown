import { Digit, FlipClockCountdownTimeDelta, FlipClockCountdownTimeDeltaFormatted } from './typings';

export const defaultTimeDelta = {
  total: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

export function calcTimeDelta(target: Date | number | string): FlipClockCountdownTimeDelta {
  const date = new Date(target);
  if (isNaN(date.getTime())) {
    throw Error('Invalid date');
  }
  const now = new Date();
  let timeLeft = Math.round((date.getTime() - now.getTime()) / 1000); // convert to seconds
  if (timeLeft < 0) timeLeft = 0;

  return {
    total: timeLeft,
    days: Math.floor(timeLeft / (24 * 60 * 60)),
    hours: Math.floor((timeLeft / 3600) % 24),
    minutes: Math.floor((timeLeft / 60) % 60),
    seconds: Math.floor(timeLeft % 60)
  };
}

export function parseTimeUnit(n: number): Digit[] {
  let preLen = 2 - String(n).length;
  if (preLen < 0) preLen = 0;
  return ('0'.repeat(preLen) + String(n)).split('');
}

export function parseTimeDelta(timeDelta: FlipClockCountdownTimeDelta): FlipClockCountdownTimeDeltaFormatted {
  const nextTimeDelta = calcTimeDelta(new Date().getTime() + (timeDelta.total - 1) * 1000);

  return {
    days: {
      current: parseTimeUnit(timeDelta.days),
      next: parseTimeUnit(nextTimeDelta.days)
    },
    hours: {
      current: parseTimeUnit(timeDelta.hours),
      next: parseTimeUnit(nextTimeDelta.hours)
    },
    minutes: {
      current: parseTimeUnit(timeDelta.minutes),
      next: parseTimeUnit(nextTimeDelta.minutes)
    },
    seconds: {
      current: parseTimeUnit(timeDelta.seconds),
      next: parseTimeUnit(nextTimeDelta.seconds)
    }
  };
}

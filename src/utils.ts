import { Digit, FlipClockCountdownTimeDelta, FlipClockCountdownTimeDeltaFormatted } from './types';

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

export function pad(n: number): Digit[] {
  return ('0'.repeat(Math.max(0, 2 - String(n).length)) + String(n)).split('');
}

export function parseTimeDelta(timeDelta: FlipClockCountdownTimeDelta): FlipClockCountdownTimeDeltaFormatted {
  const nextTimeDelta = calcTimeDelta(new Date().getTime() + (timeDelta.total - 1) * 1000);

  return {
    days: {
      current: pad(timeDelta.days),
      next: pad(nextTimeDelta.days)
    },
    hours: {
      current: pad(timeDelta.hours),
      next: pad(nextTimeDelta.hours)
    },
    minutes: {
      current: pad(timeDelta.minutes),
      next: pad(nextTimeDelta.minutes)
    },
    seconds: {
      current: pad(timeDelta.seconds),
      next: pad(nextTimeDelta.seconds)
    }
  };
}

export function convertToPx(n?: string | number): string | undefined {
  if (n === undefined) return undefined;
  if (typeof n === 'string') return n;
  return `${n}px`;
}

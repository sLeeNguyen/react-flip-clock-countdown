import { Digit, FlipClockCountdownTimeDelta, FlipClockCountdownTimeDeltaFormatted } from './types';

export const defaultTimeDelta = {
  total: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

export function isValidDate(date: Date | number | string): boolean {
  const d = new Date(date);
  return !isNaN(d.getTime());
}

export function calcTimeDelta(
  target: Date | number | string,
  current: Date | number | string
): FlipClockCountdownTimeDelta {
  if (!isValidDate(target) || !isValidDate(current)) {
    throw Error('Invalid date');
  }
  const now = new Date(current);
  const date = new Date(target);
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

export function parseTimeDelta(
  timeDelta: FlipClockCountdownTimeDelta,
  daysInHours: boolean
): FlipClockCountdownTimeDeltaFormatted {
  const nextTimeLeft = Math.max(0, timeDelta.total - 1);
  const nextTimeDelta = {
    total: nextTimeLeft,
    days: Math.floor(nextTimeLeft / (24 * 60 * 60)),
    hours: Math.floor((nextTimeLeft / 3600) % 24),
    minutes: Math.floor((nextTimeLeft / 60) % 60),
    seconds: Math.floor(nextTimeLeft % 60)
  };

  return {
    days: {
      current: pad(daysInHours ? 0 : timeDelta.days),
      next: pad(daysInHours ? 0 : nextTimeDelta.days)
    },
    hours: {
      current: pad((daysInHours ? timeDelta.days : 0) * 24 + timeDelta.hours),
      next: pad((daysInHours ? timeDelta.days : 0) * 24 + nextTimeDelta.hours)
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

export function isServer() {
  return typeof window === 'undefined';
}

export function isClient() {
  return !isServer();
}

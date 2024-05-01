import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import FlipClockCountdown from './FlipClockCountDown';

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning: ReactDOM.render is no longer supported in React 18./.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('should render a countdown', () => {
  render(<FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} />);
  expect(screen.getByTestId('fcc-container')).toBeInTheDocument();
  expect(screen.getByText('Days')).toBeInTheDocument();
  expect(screen.getByText('Hours')).toBeInTheDocument();
  expect(screen.getByText('Minutes')).toBeInTheDocument();
  expect(screen.getByText('Seconds')).toBeInTheDocument();
});

test('should instant render the completed component (children)', () => {
  const { container } = render(
    <FlipClockCountdown to={new Date().getTime() - 5000}>
      <div>Completed</div>
    </FlipClockCountdown>
  );
  expect(() => screen.getByTestId('fcc-container')).toThrow();
  expect(container.textContent).toBe('Completed');
});

test('should not render completed component if no children set and hideOnComplete is false', () => {
  render(<FlipClockCountdown hideOnComplete={false} to={new Date().getTime() - 5000} />);
  expect(screen.getByTestId('fcc-container')).toBeInTheDocument();

  cleanup();
  render(<FlipClockCountdown hideOnComplete={false} to={new Date().getTime() + 5000} />);
  act(() => {
    jest.advanceTimersByTime(6000);
  });
  expect(screen.getByTestId('fcc-container')).toBeInTheDocument();
});

test('should render the countdown and completed component when the countdown is completed', async () => {
  render(
    <FlipClockCountdown to={new Date().getTime() + 5000}>
      <div>Completed</div>
    </FlipClockCountdown>
  );
  expect(screen.getByTestId('fcc-container')).toBeInTheDocument();
  expect(() => screen.getByText('Completed')).toThrow();
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(screen.getByText('Completed')).toBeInTheDocument();
  expect(() => screen.getByTestId('fcc-container')).toThrow();
});

test('should render the countdown with custom styles', () => {
  render(
    <FlipClockCountdown
      to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
      labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
      digitBlockStyle={{ width: 40, height: '60px', fontSize: 30, color: 'red', borderRadius: '5px' }}
      dividerStyle={{ color: 'red', height: 1 }}
      separatorStyle={{ color: 'red', size: 6 }}
      duration={0.5}
      spacing={{ clock: '10px', digitBlock: 6 }}
    />
  );
  const container = screen.getByTestId('fcc-container');
  expect(container).toBeInTheDocument();
  expect(container).toHaveStyle('--fcc-spacing: 10px');
  expect(container).toHaveStyle('--fcc-flip-duration: 0.5s');
  expect(container).toHaveStyle('--fcc-digit-block-width: 40px');
  expect(container).toHaveStyle('--fcc-digit-block-height: 60px');
  expect(container).toHaveStyle('--fcc-digit-block-radius: 5px');
  expect(container).toHaveStyle('--fcc-digit-block-spacing: 6px');
  expect(container).toHaveStyle('--fcc-digit-font-size: 30px');
  expect(container).toHaveStyle('--fcc-digit-color: red');
  expect(container).toHaveStyle('--fcc-divider-color: red');
  expect(container).toHaveStyle('--fcc-divider-height: 1px');
  expect(container).toHaveStyle('--fcc-label-font-size: 10px');
  expect(container).toHaveStyle('--fcc-separator-size: 6px');
  expect(container).toHaveStyle('--fcc-separator-color: red');

  const dLabel = screen.getByText('Days');
  expect(dLabel).toBeInTheDocument();
  expect(dLabel).toHaveStyle('font-weight: 500');
  expect(dLabel).toHaveStyle('text-transform: uppercase');
});

test('should render the countdown with default labels', () => {
  render(<FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} />);
  expect(screen.getByText('Days')).toBeInTheDocument();
  expect(screen.getByText('Hours')).toBeInTheDocument();
  expect(screen.getByText('Minutes')).toBeInTheDocument();
  expect(screen.getByText('Seconds')).toBeInTheDocument();

  cleanup();
  // @ts-ignore
  render(<FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} labels={['D', 'H', 'S']} />);
  expect(() => screen.getByText('D')).toThrow();
  expect(() => screen.getByText('H')).toThrow();
  expect(screen.getByText('Days')).toBeInTheDocument();
  expect(screen.getByText('Hours')).toBeInTheDocument();
  expect(screen.getByText('Minutes')).toBeInTheDocument();
  expect(screen.getByText('Seconds')).toBeInTheDocument();
});

test('should render the countdown with custom labels', () => {
  render(<FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} labels={['D', 'H', 'M', 'S']} />);
  expect(() => screen.getByText('Days')).toThrow();
  expect(() => screen.getByText('Hours')).toThrow();
  expect(() => screen.getByText('Minutes')).toThrow();
  expect(() => screen.getByText('Seconds')).toThrow();
  expect(screen.getByText('D')).toBeInTheDocument();
  expect(screen.getByText('H')).toBeInTheDocument();
  expect(screen.getByText('M')).toBeInTheDocument();
  expect(screen.getByText('S')).toBeInTheDocument();

  cleanup();
  render(
    // @ts-ignore
    <FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} labels={['D', 'H', 'M', 'S', 'MS']} />
  );
  expect(screen.getByText('D')).toBeInTheDocument();
  expect(screen.getByText('H')).toBeInTheDocument();
  expect(screen.getByText('M')).toBeInTheDocument();
  expect(screen.getByText('S')).toBeInTheDocument();
  expect(() => screen.getByText('MS')).toThrow();
});

test('should render the countdown with no labels', () => {
  render(<FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} showLabels={false} />);
  expect(() => screen.getByText('Days')).toThrow();
  expect(() => screen.getByText('Hours')).toThrow();
  expect(() => screen.getByText('Minutes')).toThrow();
  expect(() => screen.getByText('Seconds')).toThrow();
});

test('should render the countdown with no separators', () => {
  render(<FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} showSeparators={false} />);
  expect(screen.getByTestId('fcc-container')).toHaveStyle('--fcc-separator-color: transparent');
});

test('should render the countdown with separators', () => {
  render(<FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} showSeparators={true} />);
  const container = screen.getByTestId('fcc-container');
  expect(container).not.toHaveStyle('--fcc-separator-color: transparent');
});

test('show/hide section works', () => {
  render(
    <FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} renderMap={[false, true, true, true]} />
  );
  const container = screen.getByTestId('fcc-container');
  expect(container.children.length).toEqual(3 + 2); // 3 rendered sections and 2 separators
  expect(() => screen.getByText('Days')).toThrow();
  expect(screen.getByText('Hours')).toBeInTheDocument();
  expect(screen.getByText('Minutes')).toBeInTheDocument();
  expect(screen.getByText('Seconds')).toBeInTheDocument();

  // renderMap reset to default [true, true, true, true]
  cleanup();
  // @ts-ignore
  render(<FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} renderMap={[false, true, true]} />);
  const container2 = screen.getByTestId('fcc-container');
  expect(container2.children.length).toEqual(4 + 3);
  expect(screen.getByText('Days')).toBeInTheDocument();

  cleanup();
  render(
    <FlipClockCountdown
      to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
      // @ts-ignore
      renderMap={[false, true, false, true, true]}
    />
  );
  const container3 = screen.getByTestId('fcc-container');
  expect(container3.children.length).toEqual(2 + 1);
  expect(() => screen.getByText('Days')).toThrow();
  expect(() => screen.getByText('Minutes')).toThrow();
});

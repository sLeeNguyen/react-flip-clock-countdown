import React, { useState } from 'react';

import FlipClockCountdown from 'react-flip-clock-countdown';

const Example = () => {
  const [t] = useState(Date.now() + 5 * 1000);
  return (
    <React.Fragment>
      <h1>React flip-clock countdown</h1>
      <div style={{ marginBottom: 30 }}>
        <h2>Default</h2>
        <FlipClockCountdown
          to={new Date().getTime() + 2 * 24 * 3600 * 1000 + 5000}
          now={() => {
            return Math.max(Date.now(), t);
          }}
          stopOnHiddenVisibility
          spacing={{
            clock: 16,
            digitBlock: 4
          }}
        >
          Finished
        </FlipClockCountdown>
      </div>
      <div style={{ marginBottom: 30 }}>
        <h2>Days in Hours</h2>
        <div style={{ marginBottom: 16 }}>
          <FlipClockCountdown
            to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
            daysInHours={true}
            renderOnServer={true}
          >
            Finished
          </FlipClockCountdown>
        </div>
      </div>
      <div style={{ marginBottom: 30 }}>
        <h2>Custom styles</h2>
        <div style={{ marginBottom: 16 }}>
          <FlipClockCountdown
            to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
            labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
            labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
            digitBlockStyle={{ width: 40, height: 60, fontSize: 30, borderRadius: 10 }}
            dividerStyle={{ color: 'red', height: 1 }}
            separatorStyle={{ color: 'red', size: '6px' }}
            duration={0.5}
          >
            Finished
          </FlipClockCountdown>
        </div>
        <div>
          <FlipClockCountdown className='flip-clock' to={new Date().getTime() + 24 * 3600 * 1000 + 5000} />
        </div>
      </div>
      <div style={{ marginBottom: 30 }}>
        <h2>Custom labels</h2>
        <div style={{ marginBottom: 16 }}>
          <FlipClockCountdown
            className='flip-clock'
            to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
            labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
          />
        </div>
        <div>
          <FlipClockCountdown
            className='flip-clock'
            to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
            showLabels={false}
          />
        </div>
      </div>
      <div>
        <h2>Hide separators</h2>
        <FlipClockCountdown
          className='flip-clock'
          to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
          showSeparators={false}
        />
      </div>
      <div>
        <h2>Show/Hide sections</h2>
        <FlipClockCountdown
          className='flip-clock'
          to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
          renderMap={[true, true, true, false]}
        />
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2>ReactElement Labels - Basic</h2>
        <FlipClockCountdown
          to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
          labels={[
            <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>Days</span>,
            <span style={{ color: '#4ecdc4', fontWeight: 'bold' }}>Hours</span>,
            <span style={{ color: '#45b7d1', fontWeight: 'bold' }}>Minutes</span>,
            <span style={{ color: '#96ceb4', fontWeight: 'bold' }}>Seconds</span>
          ]}
        />
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2>ReactElement Labels - With Icons</h2>
        <FlipClockCountdown
          to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
          labels={[
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span role='img' aria-label='calendar'>
                📅
              </span>
              <span>Days</span>
            </div>,
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span role='img' aria-label='clock'>
                ⏰
              </span>
              <span>Hours</span>
            </div>,
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span role='img' aria-label='hourglass'>
                ⏳
              </span>
              <span>Minutes</span>
            </div>,
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span role='img' aria-label='stopwatch'>
                ⏱️
              </span>
              <span>Seconds</span>
            </div>
          ]}
          labelStyle={{ fontSize: 12 }}
        />
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2>ReactElement Labels - Custom Components</h2>
        <FlipClockCountdown
          to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
          labels={[
            <div
              style={{
                padding: '4px 8px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '4px',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold'
              }}
            >
              DAYS
            </div>,
            <div
              style={{
                padding: '4px 8px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '4px',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold'
              }}
            >
              HOURS
            </div>,
            <div
              style={{
                padding: '4px 8px',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '4px',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold'
              }}
            >
              MINS
            </div>,
            <div
              style={{
                padding: '4px 8px',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                borderRadius: '4px',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold'
              }}
            >
              SECS
            </div>
          ]}
          digitBlockStyle={{ width: 50, height: 70, fontSize: 40 }}
        />
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2>Mixed - String and ReactElement</h2>
        <FlipClockCountdown
          to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
          labels={[
            'Days',
            <strong style={{ color: '#e74c3c' }}>Hours</strong>,
            'Minutes',
            <em style={{ color: '#3498db' }}>Seconds</em>
          ]}
        />
      </div>
    </React.Fragment>
  );
};

export default Example;

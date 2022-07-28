import React from 'react';

import FlipClockCountdown from 'react-flip-clock-countdown';

const Example = () => {
  return (
    <React.Fragment>
      <div style={{ marginBottom: 30 }}>
        <FlipClockCountdown
          to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
          labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
          labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
          digitBlockStyle={{ width: 40, height: 60, fontSize: 30 }}
          dividerStyle={{ color: 'red', height: 1 }}
          separatorStyle={{ color: 'red', size: '6px' }}
          duration={0.5}
        >
          Finished
        </FlipClockCountdown>
      </div>
      <div style={{ marginBottom: 30 }}>
        <FlipClockCountdown className='flip-clock' to={new Date().getTime() + 24 * 3600 * 1000 + 5000} />
      </div>
      <div>
        <FlipClockCountdown
          className='flip-clock'
          to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
          showLabels={false}
        />
      </div>
    </React.Fragment>
  );
};

export default Example;

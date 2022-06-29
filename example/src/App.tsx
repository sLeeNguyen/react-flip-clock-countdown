import React from 'react';

import FlipClockCountDown from 'react-flip-clock-countdown';
import 'react-flip-clock-countdown/dist/index.css';

const App = () => {
  return (
    <FlipClockCountDown className='flip-clock' to={new Date().getTime() + 24 * 3600 * 1000 + 5000}>
      Finished
    </FlipClockCountDown>
  );
};

export default App;

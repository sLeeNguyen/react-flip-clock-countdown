# react-flip-clock-countdown

> A 3D animated countdown component for React.

[![NPM](https://img.shields.io/npm/v/react-flip-clock-countdown.svg)](https://www.npmjs.com/package/react-flip-clock-countdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<div align="center">
  <img src="./resources/demo.gif" alt="react flip clock countdown demo" width="500" />
</div>

## Install

```bash
npm install --save react-flip-clock-countdown
```

## Usage

```tsx
import React, { Component } from 'react';

import FlipClockCountdown from 'react-flip-clock-countdown';
import 'react-flip-clock-countdown/dist/index.css';

class Example extends Component {
  render() {
    return <FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} />;
  }
}
```

## License

MIT © [leenguyen](https://github.com/sLeenguyen)

# react-flip-clock-countdown

> A 3D animated countdown component for React.

[![NPM](https://img.shields.io/npm/v/@leenguyen/react-flip-clock-countdown.svg)](https://www.npmjs.com/package/@leenguyen/react-flip-clock-countdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<div align="center">
  <img src="./resources/demo.gif" alt="react flip clock countdown demo" width="500" />
</div>

## Install

```bash
npm install --save @leenguyen/react-flip-clock-countdown
```

Or

```bash
yarn add @leenguyen/react-flip-clock-countdown
```

## Props

The <code>FlipClockCountdown</code> has all properties of `div` and additional props below

| Name                       | Type                       | Required | Default                                   | Description                                                                                                                                                                          |
| -------------------------- | -------------------------- | -------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **to**                     | `Date \| string \| number` | yes      |                                           | `Date` or timestamp in the future.                                                                                                                                                   |
| **now**                    | `func`                     | no       | `Date.now`                                | Alternative handler for the current time.                                                                                                                                            |
| **daysInHours**            | `boolean`                  | no       | `false`                                   | Days will be shown in hours.                                                                                                                                                         |
| ~~**containerProps**~~     | `object`                   | no       | `undefined`                               | Props apply to the flip clock container. This prop is deprecated; apply directly to the `FlipClockCountdown` component.                                                              |
| **onComplete**             | `func`                     | no       |                                           | Callback when countdown ends.<br>**Signature:**<br>`function() => void`                                                                                                              |
| **onTick**                 | `func`                     | no       |                                           | Callback on every interval tick.<br>**Signature:**<br>`function({ timeDelta, completed }) => void`                                                                                   |
| **renderMap**              | `Array<boolean>`           | no       | `[true, true, true, true]`                | Each element represents the render state of each section (day, hour, minute, second). If `true`, section will be rendered; `false` otherwise.                                        |
| **labels**                 | `Array<string>`            | no       | `['Days', 'Hours', 'Minutes', 'Seconds']` | Custom array of labels for each section (day, hour, minute, second).                                                                                                                 |
| **showLabels**             | `boolean`                  | no       | `true`                                    | Set to `false` to hide the labels.                                                                                                                                                   |
| **showSeparators**         | `boolean`                  | no       | `true`                                    | Set to `false` to hide the separators (colon) between time units.                                                                                                                    |
| **labelStyle**             | `React.CSSProperties`      | no       | `undefined`                               | Styles applied to labels (`font-size`, `color`, `width`, `height`, etc.).                                                                                                            |
| **digitBlockStyle**        | `React.CSSProperties`      | no       | `undefined`                               | Styles applied to digit blocks (`font-size`, `color`, `width`, `height`, etc.).                                                                                                      |
| **separatorStyle**         | `object`                   | no       | `undefined`                               | Styles applied to separator (colon), includes `size` and `color`.                                                                                                                    |
| **dividerStyle**           | `object`                   | no       | `undefined`                               | Styles applied to divider, includes `color` and `height`.                                                                                                                            |
| **spacing**                | `object`                   | no       | `undefined`                               | Modify the clock spacing.                                                                                                                                                            |
| **duration**               | `number`                   | no       | `0.7`                                     | Duration (in seconds) for flip card animation. Valid range: (0, 1).                                                                                                                  |
| **hideOnComplete**         | `boolean`                  | no       | `true`                                    | By default, hides the countdown when completed (or shows children if provided). Set to `false` to keep timer at zeros when completed.                                                |
| **stopOnHiddenVisibility** | `boolean`                  | no       | `false`                                   | Stop the clock when the visibilityState is hidden. Prevents the component from getting out of sync when switching browser tabs.                                                      |
| **renderOnServer**         | `boolean`                  | no       | `false`                                   | If `true`, the clock renders on the server with all digits set to zero. This helps prevent UI layout shifts during client-side hydration, especially in SSR frameworks like Next.js. |

## Usage

### Basic usage

```tsx
import React, { Component } from 'react';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

class Example extends Component {
  render() {
    return <FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} />;
  }
}
```

### Render a React Component when countdown is complete

In case you want to change the output of the component, or want to signal that the countdown's work is done, you can do this by either using the onComplete callback or by specifying a React child within `<FlipClockCountdown></FlipClockCountdown>`, which will only be shown once the countdown is complete.

```tsx
import React, { Component } from 'react';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

class Completed extends Component {
  render() {
    return <span>The countdown is complete</span>
  }
}

class RenderByUsingReactChild extends Component {
  render() {
    return (
      <FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000}>
        <Completed />
      </FlipClockCountdown>;
    )
  }
}

class RenderByUsingCallback extends Component {
  constructor(props) {
    super(props);

    this.endTime = new Date().getTime() + 24 * 3600 * 1000 + 5000;
    this.state = {
      isCompleted: false
    }

    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete() {
    this.setState({ isCompleted: true });
  }

  render() {
    return (
      <React.Fragment>
        {isCompleted && <Completed />}
        <FlipClockCountdown onComplete={this.handleComplete} to={this.endTime} />
      </React.Fragment>
    )
  }
}
```

### Render a custom countdown

#### Custom styles

```tsx
class Example extends Component {
  render() {
    return (
      <FlipClockCountdown
        to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
        labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
        labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
        digitBlockStyle={{ width: 40, height: 60, fontSize: 30 }}
        dividerStyle={{ color: 'white', height: 1 }}
        separatorStyle={{ color: 'red', size: '6px' }}
        duration={0.5}
      >
        Finished
      </FlipClockCountdown>
    );
  }
}
```

#### Custom styles via css

```tsx
import 'styles.css';

class Example extends Component {
  render() {
    return <FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} className='flip-clock' />;
  }
}
```

```css
/* styles.css */

.flip-clock {
  --fcc-flip-duration: 0.5s; /* transition duration when flip card */
  --fcc-spacing: 8px; /* space between unit times and separators */
  --fcc-digit-block-width: 40px; /* width of digit card */
  --fcc-digit-block-height: 60px; /* height of digit card, highly recommend in even number */
  --fcc-digit-block-radius: 5px; /* border radius of digit card */
  --fcc-digit-block-spacing: 5px; /* space between blocks in each unit of time */
  --fcc-digit-font-size: 30px; /* font size of digit */
  --fcc-digit-color: white; /* color of digit */
  --fcc-label-font-size: 10px; /* font size of label */
  --fcc-label-color: #ffffff; /* color of label */
  --fcc-background: black; /* background of digit card */
  --fcc-divider-color: white; /* color of divider */
  --fcc-divider-height: 1px; /* height of divider */
  --fcc-separator-size: 6px; /* size of colon */
  --fcc-separator-color: red; /* color of colon */
}
```

#### Custom section to be rendered

In case you don't want to display the date, use `renderMap` to custom render state of each section

```tsx
class Example extends Component {
  render() {
    return (
      <FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} renderMap={[false, true, true, true]}>
        Finished
      </FlipClockCountdown>
    );
  }
}
```

## Contributing

The package is made up of 2 main folders:

- <code>/src</code> contains the FlipClockCountdown
- <code>/examples</code> contains the create-react-app and create-next-app based demo website

To setup and run a local copy:

1. Clone this repo with `https://github.com/sLeeNguyen/react-flip-clock-countdown`
2. Run `npm install` in the **root** folder
3. Run `npm install` in the **examples/react-app** folder
4. In separate terminal windows, run `npm start` in the **root** and **examples/react-app** folders.

When you're done working on your changes, feel free to send PRs with the details and include a screenshot if you've changed anything visually.

## License

MIT © [leenguyen](https://github.com/sLeenguyen)

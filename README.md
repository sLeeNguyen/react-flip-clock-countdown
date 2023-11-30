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

| Name                                      |                   Type                    | Required |                       Default                        | Description                                                                                                                                                                      |
| :---------------------------------------- | :---------------------------------------: | :------: | :--------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**to**](#to)                             | <code>Date&#124;string&#124;number</code> |   yes    |                                                      | <code>Date</code> or timestamp in the future.                                                                                                                                    |
| [~~**containerProps**~~](#containerprops) |            <code>object</code>            |    no    |                <code>undefined</code>                | Props apply to the flip clock container. This prop is deprecated, you should apply directly to the <code>FlipClockCountdown</code> component.                                    |
| [**onComplete**](#oncomplete)             |             <code>func</code>             |    no    |                                                      | Callback when countdown ends<br/> **Signature**:<br/>`function() => void`                                                                                                        |
| [**onTick**](#ontick)                     |             <code>func</code>             |    no    |                                                      | Callback on every interval tick<br /> **Signature**:<br/>`function({ timeDelta, completed }) => void`                                                                            |
| **renderMap**                             |       <code>`Array<boolean>`</code>       |    no    |        <code>[true, true, true, true]</code>         | Each element represents the render state of each section (day, hour, minute, second). If `true` section will be rendered, `false` otherwise.                                     |
| **labels**                                |       <code>`Array<string>`</code>        |    no    | <code>['Days', 'Hours', 'Minutes', 'Seconds']</code> | Custom array of labels used to represent information for each section (day, hour, minute, second).                                                                               |
| **showLabels**                            |           <code>boolean</code>            |    no    |                  <code>true</code>                   | Set it to `false` if you don't want to show the labels.                                                                                                                          |
| **showSeparators**                        |           <code>boolean</code>            |    no    |                  <code>true</code>                   | Set it to `false` if you don't want to show the separators (colon) between time unit.                                                                                            |
| **labelStyle**                            |     <code>React.CSSProperties</code>      |    no    |                <code>undefined</code>                | The styles apply to labels `font-size`, `color`, `width`, `height`, etc.                                                                                                         |
| **digitBlockStyle**                       |     <code>React.CSSProperties</code>      |    no    |                <code>undefined</code>                | The styles apply to digit blocks like `font-size`, `color`, `width`, `height`, etc.                                                                                              |
| **separatorStyle**                        |            <code>object</code>            |    no    |                <code>undefined</code>                | The styles apply to separator (colon), includes `size` and `color`.                                                                                                              |
| **dividerStyle**                          |            <code>object</code>            |    no    |                <code>undefined</code>                | The style will be applied to divider, includes `color` and `height`.                                                                                                             |
| **duration**                              |            <code>number</code>            |    no    |                   <code>0.7</code>                   | Duration (in second) when flip card. Valid value in range (0, 1).                                                                                                                |
| **hideOnComplete**                        |           <code>boolean</code>            |    no    |                  <code>true</code>                   | By befault, the countdown will be hidden when it completed (or show children if provided). This will keep the timer in place and stuck at zeros when the countdown is completed. |

### `to`

The `to` prop can be a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object, `string`, or timestamp in the future. This date is compared with the current date.

Valid values can be _(and more)_:

- `'2022-02-08T14:27:32.635Z'` // [`Date` time string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format)
- `1644330452635` // Timestamp in milliseconds
- `new Date(1644330452635)` // [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object

### `className`

Class names applied to flip clock container element. Use it to custom flip-clock's styles. See [example](#render-a-countdown-with-custom-styles)

### `containerProps`

All props of `div`

### `children`

This component also considers the child that may live within the `<FlipClockCountdown></FlipClockCountdown>` element, which, in case it's available, replaces the countdown's component state once it's complete. See [example](#render-a-react-component-when-countdown-is-complete).

### `onComplete`

Callback when countdown ends.

`function() => void`

See [example](#render-a-react-component-when-countdown-is-complete).

### `onTick`

Callback on every interval tick.

`function({ timeDelta, completed }) => void`

- `timeDelta: { total: number, days: number, hours: number, minutes: number, seconds: number}` - the remaining time in formatted.
- `completed: boolean` - countdown's state.

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
  --fcc-digit-block-width: 40px; /* width of digit card */
  --fcc-digit-block-height: 60px; /* height of digit card, highly recommend in even number */
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

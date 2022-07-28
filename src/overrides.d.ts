// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as CSS from 'csstype';

// extend css properties
// Ref: https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
declare module 'csstype' {
  interface Properties {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [customCssName: string]: any;
  }
}

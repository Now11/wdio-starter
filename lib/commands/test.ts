//TO DO: Not implemented yet

declare module WebdriverIO {
  // adding command to `$()`
  interface Element {
    // don't forget to wrap return values with Promise
    elementCustomCommand: (arg) => Promise<number>;
  }
}

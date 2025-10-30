declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toHaveUserName(expectedName: string): Promise<R>;
    }
  }
}

export {};

export interface TokenGenerator {
  generateToken: (params: TokenGenerator.Params) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TokenGenerator {
  export type Params = {
    key: string;
    expirationInMs: number
  };
}

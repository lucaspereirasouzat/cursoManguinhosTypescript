export interface TokenGenerator {
  generateToken: (params: TokenGenerator.Params) => Promise<TokenGenerator.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TokenGenerator {
  export type Params = {
    key: string;
    expirationInMs: number
  };
  export type Result = string
}

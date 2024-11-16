export interface TokenGenerator {
  generateToken: (params: TokenGeneratorParams) => Promise<TokenGeneratorResult>;
}

export type TokenGeneratorParams = {
  key: string;
  expirationInMs: number
}

export type TokenGeneratorResult = string
export interface HttpGetClient {
  get: (params: HttpGetClient.Params) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace HttpGetClient {
  export type Params = {
    url: string;
    params: object;
  };
}
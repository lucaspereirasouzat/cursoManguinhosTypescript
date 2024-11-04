export interface HttpGetClient {
  get: (params: HttpGetClient.Params) => Promise<HttpGetClient.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace HttpGetClient {
  export type Params = {
    url: string;
    params: object;
  };

  export type Result = any;
}
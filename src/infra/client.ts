export interface HttpGetClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: <T = any> (params: HttpGetClient.Params) => Promise<T>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace HttpGetClient {
  export type Params = {
    url: string;
    params: object;
  };

}
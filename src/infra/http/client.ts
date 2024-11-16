export interface HttpGetClient {
  get: <T = any> (params: HttpGetClientParams) => Promise<T>;
}

export type HttpGetClientParams = {
  url: string;
  params: object;
}
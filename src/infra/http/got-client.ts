import { HttpGetClientParams, HttpGetClient } from "@/infra";
import got from "got";

export class GotHttpClient implements HttpGetClient {
  async get(args: HttpGetClientParams): Promise<any> {
    const searchParams = new URLSearchParams(args?.params);
    const result = await got.get(args.url, { searchParams });
    return result.body;
  }
}

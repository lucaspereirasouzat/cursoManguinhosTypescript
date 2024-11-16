import { HttpGetClientParams } from "@/infra";
import got from "got";
vi.mock("got");

class GotHttpClient {
  async get(args: HttpGetClientParams): Promise<any> {
    const searchParams = new URLSearchParams(args?.params);
    await got.get(args.url, { searchParams});
  }
}

describe("GotHttpClient", () => {
  let sut: GotHttpClient;
  let fakeGot: typeof got;
  let url: string
  let params: Record<string, string>
  
  beforeAll(() => {
    url = "any_url"
    params = { any: "any" }
      fakeGot = got as typeof got
  })

  beforeEach(() => {
    sut = new GotHttpClient();
  })
  describe("get", () => {
    it("should call got with correct params", async () => {
      await sut.get({ url, params });

      expect(fakeGot.get).toHaveBeenCalledWith(url, { searchParams: new URLSearchParams(params) });
    });
  });
});

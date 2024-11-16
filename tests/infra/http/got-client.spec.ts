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
  describe("get", () => {
    it("should call got with correct params", async () => {
      const fakeGot = got as typeof got
      const sut = new GotHttpClient();
      await sut.get({ url: "any_url", params: { any: "any" } });

      expect(fakeGot.get).toHaveBeenCalledWith("any_url", { searchParams: new URLSearchParams({ any: "any" }) });
    });
  });
});

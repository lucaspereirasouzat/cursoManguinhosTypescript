import { GotHttpClient } from "@/infra/http/got-client";
import got from "got";
import { Mocked } from "vitest";
vi.mock("got");


describe("GotHttpClient", () => {
  let sut: GotHttpClient;
  let fakeGot: Mocked<typeof got>;
  let url: string
  let params: Record<string, string>

  beforeAll(() => {
    url = "any_url"
    params = { any: "any" }
    fakeGot = got as Mocked<typeof got>
    fakeGot.get.mockResolvedValue({
      body: 'any_data',
      statusCode: 200
    })
  })

  beforeEach(() => {
    sut = new GotHttpClient();
  })
  describe("get", () => {
    it("should call got with correct params", async () => {
      await sut.get({ url, params });

      expect(fakeGot.get).toHaveBeenCalledWith(url, { searchParams: new URLSearchParams(params) });
      expect(fakeGot.get).toBeCalledTimes(1)
    });

     it("should return data on success", async () => {
      const result = await sut.get({ url, params });

      expect(result).toEqual('any_data');
    });

    it("should rethrow if get throws", async () => {
      fakeGot.get.mockRejectedValueOnce(new Error('any_error'))
      const promise = sut.get({ url, params });

      void expect(promise).rejects.toThrow(new Error('any_error'))
    });
  });
});

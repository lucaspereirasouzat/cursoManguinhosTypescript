import { FacebookApi } from "@/infra/apis";
import { HttpGetClient } from "@/infra/client";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { mock, MockProxy } from "vitest-mock-extended";

describe("FacebookApi", () => {
  let clientId: string;
  let clientSecret: string;
  let sut: FacebookApi;
  let httpClient: MockProxy<HttpGetClient>;

  beforeAll(() => {
    clientId = "any_client_id";
    clientSecret = "any_client_secret";
    httpClient = mock();
  });

  beforeEach(() => {
    httpClient.get.mockResolvedValueOnce({});
    sut = new FacebookApi(httpClient, clientId, clientSecret);
  });
  it("should get app token", async () => {
    await sut.loadUser({ token: "any_token" });

    expect(httpClient.get).toBeCalledWith({
      url: "https://graph.facebook.com/oauth/access_token",
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      },
    });
  });

  it("should get debug token", async () => {
    await sut.loadUser({ token: "any_token" });
    expect(httpClient.get).toBeCalledWith({
      url: "https://graph.facebook.com/debug_token",
      params: {
        access_token: undefined,
        input_token: "any_token",
      },
    });
  });
});

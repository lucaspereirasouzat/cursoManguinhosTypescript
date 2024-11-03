import { LoadFacebookUserApi } from "@/data/contracts/apis";
import { describe, expect, it } from "vitest";
import { mock } from "vitest-mock-extended";

class FacebookApi {
    private readonly baseUrl = 'https://graph.facebook.com'
    constructor(
        private readonly httpClient: HttpGetClient, 
        private readonly clientId: string, 
        private readonly clientSecret: string
    ) { }
    async loadUser(params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
        await this.httpClient.get({
            url: `${this.baseUrl}/oauth/access_token`,
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'client_credentials'
            }
        })
    }
}     

interface HttpGetClient {
    get: (params: HttpGetClient.Params) => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace HttpGetClient {
    export type Params = {
        url: string
        params: object
    }
}

describe('FacebookApi', () => {
    const clientId = 'any_client_id'
    const clientSecret = 'any_client_secret'
    it("should get app token", async () => {
        const httpClient = mock<HttpGetClient>()
        const sut = new FacebookApi(httpClient, clientId, clientSecret)

        await sut.loadUser({ token: 'any_token'});

        expect(httpClient.get).toBeCalledWith({
            url: 'https://graph.facebook.com/oauth/access_token',
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            }
        });
    })
});
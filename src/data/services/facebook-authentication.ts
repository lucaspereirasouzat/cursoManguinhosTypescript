import { AuthenticationError, FacebookAuthentication } from "@/domain"
import { LoadFacebookUserApi } from "@/data/contracts/apis"

export class FacebookAuthenticationService {
    constructor(private readonly loadFacebookUserApi: LoadFacebookUserApi) {
    }
    async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        this.loadFacebookUserApi.loadUserByToken(params)
        return new AuthenticationError()
    }
}
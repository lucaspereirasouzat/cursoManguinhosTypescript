import { AuthenticationError, FacebookAuthentication } from "@/domain"
import { LoadFacebookUserApi } from "@/data/contracts/apis"
import { LoadUserAccountRepository } from "@/data/contracts/repos/user-account"

export class FacebookAuthenticationService {
    constructor(
        private readonly loadFacebookUserApi: LoadFacebookUserApi,
        private readonly loadUserRepo: LoadUserAccountRepository
    ) {
    }
    async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        const fbData = await this.loadFacebookUserApi.loadUser(params)
        if(fbData !== undefined){
            await this.loadUserRepo.load({ email: fbData?.email })
        }
        return new AuthenticationError()
    }
}
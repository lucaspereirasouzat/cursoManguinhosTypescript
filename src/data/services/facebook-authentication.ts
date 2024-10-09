import { AuthenticationError, FacebookAuthentication } from "@/domain"
import { LoadFacebookUserApi } from "@/data/contracts/apis"
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from "@/data/contracts/repos/user-account"

export class FacebookAuthenticationService {
    constructor(
        private readonly loadFacebookUserApi: LoadFacebookUserApi,
        private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository,
    ) {
    }
    async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        const fbData = await this.loadFacebookUserApi.loadUser(params)
        if(fbData !== undefined){
            await this.userAccountRepo.load({ email: fbData?.email })
            await this.userAccountRepo.createFromFacebook(fbData)
        }
        return new AuthenticationError()
    }
}
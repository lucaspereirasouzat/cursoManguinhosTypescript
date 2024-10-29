import { AuthenticationError, FacebookAuthentication } from "@/domain"
import { LoadFacebookUserApi } from "@/data/contracts/apis"
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from "@/data/contracts/repos/user-account"
import { FacebookAccount } from "@/domain/models"

export class FacebookAuthenticationService {
    constructor(
        private readonly facebookApi: LoadFacebookUserApi,
        private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository ,
    ) {
    }
    async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        const fbData = await this.facebookApi.loadUser(params)
        if(fbData !== undefined){
            const accountData = await this.userAccountRepo.load({ email: fbData?.email })
            const fbAccount = new FacebookAccount(fbData,accountData)
            await this.userAccountRepo.saveWithFacebook(fbAccount)
        }
        return new AuthenticationError()
    }
}



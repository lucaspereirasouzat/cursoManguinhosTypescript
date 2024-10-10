import { AuthenticationError, FacebookAuthentication } from "@/domain"
import { LoadFacebookUserApi } from "@/data/contracts/apis"
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from "@/data/contracts/repos/user-account"

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
            await this.userAccountRepo.saveWithFacebook({
                id: accountData?.id,
                name: accountData?.name ?? fbData.name,
                email: fbData.email,
                facebookId: fbData.id
            })
        }
        return new AuthenticationError()
    }
}
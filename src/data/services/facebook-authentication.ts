import { AuthenticationError, FacebookAuthentication } from "@/domain"
import { LoadFacebookUserApi } from "@/data/contracts/apis"
import { TokenGenerator } from "@/data/contracts/crypto"
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from "@/data/contracts/repos/user-account"
import { AccessToken, FacebookAccount } from "@/domain/models"

export class FacebookAuthenticationService implements FacebookAuthentication {
    constructor(
        private readonly facebookApi: LoadFacebookUserApi,
        private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
        private readonly tokenGenerator: TokenGenerator
    ) {
    }
    async perform(params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
        const fbData = await this.facebookApi.loadUser(params)
        if(fbData !== undefined){
            const accountData = await this.userAccountRepo.load({ email: fbData?.email })
            const fbAccount = new FacebookAccount(fbData,accountData)
            const { id } = await this.userAccountRepo.saveWithFacebook(fbAccount)
            const token = await this.tokenGenerator.generateToken({
                key: id,
                expirationInMs: AccessToken.expirationInMs
            })
            console.log(token)
            return new AccessToken(token)
        }
        return new AuthenticationError()
    }
}



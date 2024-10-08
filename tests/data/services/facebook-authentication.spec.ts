import {describe, it, expect} from 'vitest'
import {FacebookAuthentication} from '@/domain/features/facebook-authentication'
import { AuthenticationError } from '@/domain/errors/authentication'
import { FacebookAuthenticationApi, LoadFacebookUserApi } from '@/data/contracts/apis'

class FacebookAuthenticationService {
    constructor(private readonly loadFacebookUserApi: LoadFacebookUserApi) {
    }
    async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        this.loadFacebookUserApi.loadUserByToken(params)
        return new AuthenticationError()
    }
}



class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
    token?: string
    result  = undefined
    async loadUserByToken(params: FacebookAuthenticationApi.Params): Promise<FacebookAuthenticationApi.Result> {
        this.token = params.token
    }
}
describe('FacebookAuthenticationService', () => {
    it('load call LoadFacebookUserApi with correct params', async () => {
        const loadFacebookUserApi = new LoadFacebookUserApiSpy()
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        await sut.perform({ token: 'any_token' })

        expect(loadFacebookUserApi.token).toBe('any_token')
    })
     it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        const loadFacebookUserApi = new LoadFacebookUserApiSpy()
        loadFacebookUserApi.result = undefined
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        const result = await sut.perform({ token: 'any_token' })

        expect(result).toEqual(new AuthenticationError())
    })
});
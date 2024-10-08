import {describe, it, expect} from 'vitest'
import { AuthenticationError } from '@/domain/errors/authentication'
import { FacebookAuthenticationApi, LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'


class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
    token?: string
    result  = undefined
    callsCount = 0
    async loadUserByToken(params: FacebookAuthenticationApi.Params): Promise<FacebookAuthenticationApi.Result> {
        this.token = params.token
        this.callsCount++
    }
}
describe('FacebookAuthenticationService', () => {
    it('load call LoadFacebookUserApi with correct params', async () => {
        const loadFacebookUserApi = new LoadFacebookUserApiSpy()
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        await sut.perform({ token: 'any_token' })

        expect(loadFacebookUserApi.token).toBe('any_token')
        expect(loadFacebookUserApi.callsCount).toBe(1)
    })
     it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        const loadFacebookUserApi = new LoadFacebookUserApiSpy()
        loadFacebookUserApi.result = undefined
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        const result = await sut.perform({ token: 'any_token' })

        expect(result).toEqual(new AuthenticationError())
    })
});
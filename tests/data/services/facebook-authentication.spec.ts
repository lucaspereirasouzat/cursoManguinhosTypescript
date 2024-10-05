/* eslint-disable @typescript-eslint/no-namespace */
import {describe, it, expect} from 'vitest'
import {FacebookAuthentication} from '@/domain/features/facebook-authentication'

class FacebookAuthenticationService {
    constructor(private readonly loadFacebookUserApi: LoadFacebookUserApi) {
    }
    async perform(params: FacebookAuthentication.Params): Promise<void> {
        return this.loadFacebookUserApi.loadUserByToken(params)
    }
}

interface LoadFacebookUserApi {
    loadUserByToken: (token: FacebookAuthenticationApi.Params) => Promise<void>
}

namespace FacebookAuthenticationApi {
    export type Params = {
        token: string
    }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
    token?: string
    async loadUserByToken(params: FacebookAuthenticationApi.Params): Promise<void> {
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
});
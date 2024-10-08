import {describe, it, expect, vitest} from 'vitest'
import { AuthenticationError } from '@/domain/errors/authentication'
import { FacebookAuthenticationService } from '@/data/services'

describe('FacebookAuthenticationService', () => {
    it('load call LoadFacebookUserApi with correct params', async () => {
        const loadFacebookUserApi = {
            loadUser: vitest.fn()
        }
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        await sut.perform({ token: 'any_token' })

        expect(loadFacebookUserApi.loadUser).toBeCalledWith({
            token: 'any_token'
        })
        expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1)
    })
     it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        const loadFacebookUserApi = {
            loadUser: vitest.fn()
        }
        loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        const result = await sut.perform({ token: 'any_token' })

        expect(result).toEqual(new AuthenticationError())
    })
});
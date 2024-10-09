import {describe, it, expect, beforeEach} from 'vitest'
import { AuthenticationError } from '@/domain/errors/authentication'
import { FacebookAuthenticationService } from '@/data/services'
import {mock, MockProxy} from "vitest-mock-extended"
import { LoadFacebookUserApi } from '@/data/contracts/apis';
describe('FacebookAuthenticationService', () => {
    let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
    let sut: FacebookAuthenticationService

    beforeEach(() => {
        loadFacebookUserApi = mock()
        sut = new FacebookAuthenticationService(loadFacebookUserApi)
    })
    it('load call LoadFacebookUserApi with correct params', async () => {
        await sut.perform({ token: 'any_token' })

        expect(loadFacebookUserApi.loadUser).toBeCalledWith({
            token: 'any_token'
        })
        expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1)
    })
     it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
        const result = await sut.perform({ token: 'any_token' })

        expect(result).toEqual(new AuthenticationError())
    })
});
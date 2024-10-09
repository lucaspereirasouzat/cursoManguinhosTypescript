import {describe, it, expect, beforeEach} from 'vitest'
import { AuthenticationError } from '@/domain/errors/authentication'
import { FacebookAuthenticationService } from '@/data/services'
import {mock, MockProxy} from "vitest-mock-extended"
import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { LoadUserAccountRepository } from '@/data/contracts/repos/user-account';
describe('FacebookAuthenticationService', () => {
    let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
    let loadUserRepo: MockProxy<LoadUserAccountRepository>
    let sut: FacebookAuthenticationService

    const token = 'any_token'
    beforeEach(() => {
        loadFacebookUserApi = mock()
        loadFacebookUserApi.loadUser.mockResolvedValue({
            name: 'any_name',
            email: 'any_fb_email',
            facebookId: 'any_facebook_id'
        })
        loadUserRepo = mock()
        sut = new FacebookAuthenticationService(loadFacebookUserApi, loadUserRepo)
    })
    it('load call LoadFacebookUserApi with correct params', async () => {
        await sut.perform({ token })

        expect(loadFacebookUserApi.loadUser).toBeCalledWith({
            token
        })
        expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1)
    })
    it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
        const result = await sut.perform({ token })

        expect(result).toEqual(new AuthenticationError())
    })
    it('should return AuthenticationError when LoadFacebookUserApi returns data', async () => {
        await sut.perform({ token })

        expect(loadUserRepo.load).toBeCalledWith(
            {
                email: 'any_fb_email'
            }
        )
        expect(loadUserRepo.load).toBeCalledTimes(1)
    })
});


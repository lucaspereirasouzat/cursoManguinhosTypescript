import {describe, it, expect} from 'vitest'
import { AuthenticationError } from '@/domain/errors/authentication'
import { FacebookAuthenticationService } from '@/data/services'
import {mock} from "vitest-mock-extended"
import { LoadFacebookUserApi } from '@/data/contracts/apis';

const makeSut = () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    return { sut, loadFacebookUserApi }
}
describe('FacebookAuthenticationService', () => {
    it('load call LoadFacebookUserApi with correct params', async () => {
        const { sut, loadFacebookUserApi } = makeSut()
        await sut.perform({ token: 'any_token' })

        expect(loadFacebookUserApi.loadUser).toBeCalledWith({
            token: 'any_token'
        })
        expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1)
    })
     it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        const { sut, loadFacebookUserApi } = makeSut()
        loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
        const result = await sut.perform({ token: 'any_token' })

        expect(result).toEqual(new AuthenticationError())
    })
});
import { JwtTokenGenerator } from '@/infra/crypto/jwt-token-generator';
import jwt from 'jsonwebtoken'
import { Mocked } from 'vitest';

vitest.mock('jsonwebtoken')

describe('JwtTokenGenerator', () => {
    let fakeJwt: Mocked<typeof jwt>
    let sut: JwtTokenGenerator
    let secret: string

    beforeAll(() => {
        fakeJwt = jwt as Mocked<typeof jwt>
        fakeJwt.sign.mockImplementation(() => 'any_token')
        secret = 'secret'
    })
    beforeEach(() => {
        sut = new JwtTokenGenerator(secret)
    })

    it('should call sign with correct params', async () => {
        await sut.generateToken({key: 'any_key', expirationInMs: 1000});
        expect(fakeJwt.sign).toHaveBeenCalledWith({ key: 'any_key' }, 'secret', {expiresIn: 1});
    });

    it('should return a token', async () => {
        const token = await sut.generateToken({key: 'any_key', expirationInMs: 1000});
        expect(token).toBe('any_token');
    });

    it('should rethrow if sign throws', async () => {
        fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') });
        const promise = sut.generateToken({key: 'any_key', expirationInMs: 1000});
        await expect(promise).rejects.toThrow(new Error('token_error'));
    })
});
import { TokenGeneratorParams, TokenGeneratorResult } from '@/data/contracts/crypto';
import jwt from 'jsonwebtoken'
import { Mocked } from 'vitest';

vitest.mock('jsonwebtoken')

const ONE_SECOND_IN_MILLISECONDS = 1000

class JwtTokenGenerator {
    constructor(private readonly secret: string) {}

    async generateToken(params: TokenGeneratorParams): Promise<TokenGeneratorResult> {
        const expirationInMs = params.expirationInMs / ONE_SECOND_IN_MILLISECONDS;
        return jwt.sign({ key: params.key }, this.secret, { expiresIn: expirationInMs });
    }
}

describe('JwtTokenGenerator', () => {
    let fakeJwt: Mocked<typeof jwt>
    let sut: JwtTokenGenerator
    let secret: string

    beforeAll(() => {
        fakeJwt = jwt as Mocked<typeof jwt>
        secret = 'secret'
    })
    beforeEach(() => {
        sut = new JwtTokenGenerator(secret)
    })

    it('should call sign with correct params', async () => {
        await sut.generateToken({key: 'any_key', expirationInMs: 1000});
        expect(fakeJwt.sign).toHaveBeenCalledWith({ key: 'any_key' }, 'secret', {expiresIn: 1});
    });
});
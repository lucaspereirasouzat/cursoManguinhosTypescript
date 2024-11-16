import { TokenGeneratorParams, TokenGeneratorResult, TokenGenerator } from "@/data/contracts/crypto";
import jwt from 'jsonwebtoken'

const ONE_SECOND_IN_MILLISECONDS = 1000

export class JwtTokenGenerator implements TokenGenerator {
    constructor(private readonly secret: string) {}

    async generateToken(params: TokenGeneratorParams): Promise<TokenGeneratorResult> {
        const expirationInMs = params.expirationInMs / ONE_SECOND_IN_MILLISECONDS;
        return jwt.sign({ key: params.key }, this.secret, { expiresIn: expirationInMs });
    }
}
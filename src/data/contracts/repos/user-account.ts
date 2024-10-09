/* eslint-disable @typescript-eslint/no-namespace */
export interface LoadUserAccountRepository {
    load: (params: LoadUserAccountRepository) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
    export type Params = {
        email: string
    }

    export type Result = undefined
}

export interface CreateFacebookAccountRepository {
    createFromFacebook: (params: CreateFacebookAccountRepository) => Promise<CreateFacebookAccountRepository.Result>
}

export namespace CreateFacebookAccountRepository {
    export type Params = {
        email: string
        name: string
        facebookId: string
    }

    export type Result = undefined
}
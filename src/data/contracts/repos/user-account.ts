/* eslint-disable @typescript-eslint/no-namespace */
export interface LoadUserAccountRepository {
    load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
    export type Params = {
        email: string
    }

    export type Result = undefined | {
        id: string
        name?: string
    }
}

export interface SaveFacebookAccountRepository {
    saveWithFacebook: (params: CreateFacebookAccountRepository.Params) => Promise<CreateFacebookAccountRepository.Result>
}

export namespace CreateFacebookAccountRepository {
    export type Params = {
        id?: string
        email: string
        name: string
        facebookId: string
    }

    export type Result = undefined
}

/* eslint-disable @typescript-eslint/no-namespace */
export interface LoadFacebookUserApi {
    loadUserByToken: (token: FacebookAuthenticationApi.Params) => Promise<FacebookAuthenticationApi.Result>
}

export namespace FacebookAuthenticationApi {
    export type Params = {
        token: string
    }

    export type Result = undefined
}
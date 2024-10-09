/* eslint-disable @typescript-eslint/no-namespace */
export interface LoadFacebookUserApi {
    loadUser: (token: FacebookAuthenticationApi.Params) => Promise<FacebookAuthenticationApi.Result>
}

export namespace FacebookAuthenticationApi {
    export type Params = {
        token: string
    }

    export type Result = undefined | {
        name: string
        email: string
        facebookId: string
    }
}
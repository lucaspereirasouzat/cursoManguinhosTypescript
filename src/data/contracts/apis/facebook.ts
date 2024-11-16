// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FacebookAuthenticationApi {
    export type Params = {
        token: string
    }

    export type Result = undefined | {
        id: string
        name: string
        email: string
        facebookId: string
    }
}
export interface LoadFacebookUserApi {
    loadUser: (token: FacebookAuthenticationApi.Params) => Promise<FacebookAuthenticationApi.Result>
}

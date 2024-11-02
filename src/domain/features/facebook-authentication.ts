import { AccessToken } from "@/domain/models/access-token"
import { AuthenticationError } from "../errors"

export interface FacebookAuthentication {
    perform(params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result>
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FacebookAuthentication {
    export type Params = {
        token: string
    }

    export type Result = AccessToken | AuthenticationError
}
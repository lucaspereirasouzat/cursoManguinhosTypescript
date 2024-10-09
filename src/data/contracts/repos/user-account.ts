/* eslint-disable @typescript-eslint/no-namespace */
export interface LoadUserAccountRepository {
    load: (params: LoadUserAccountRepository) => Promise<void>
}

export namespace LoadUserAccountRepository {
    export type Params = {
        email: string
    }
}
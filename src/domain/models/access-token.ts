const ONE_SECOND_IN_MILLISECONDS = 1000
const ONE_MINUTE_IN_MILLISECONDS = ONE_SECOND_IN_MILLISECONDS * 60
const THIRTY_MINUTES_IN_MILLISECONDS = ONE_MINUTE_IN_MILLISECONDS * 30

export class AccessToken {
    constructor(private readonly value: string) {
        this.value = value
    }
    static get expirationInMs(): number {
        return THIRTY_MINUTES_IN_MILLISECONDS
    }
}
import {AccessToken} from '@/domain/models/access-token'
describe('AccessToken', () => {
  it('should create with a value', () => {
    const sut = new AccessToken('any value')
    expect(sut).toEqual({ value: 'any value' })
  })

  it('should expire in THIRTY_MINUTES_IN_MILLISECONDS', () => {
    const THIRTY_MINUTES_IN_MILLISECONDS = 1800000
    expect(AccessToken.expirationInMs).toEqual(THIRTY_MINUTES_IN_MILLISECONDS)
  })
})
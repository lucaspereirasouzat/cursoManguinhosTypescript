import {AccessToken} from '@/domain/models/access-token'
import { describe, expect, it } from 'vitest'

describe('AccessToken', () => {
  it('should create with a value', () => {
    const sut = new AccessToken('any value')
    expect(sut).toEqual({ value: 'any value' })
  })
})
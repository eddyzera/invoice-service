import { describe, it, expect, beforeEach } from 'vitest'
import { CreateUserService } from '../createUserService'
import { InMemoryUserRepository } from '@/test/inMemoryRepository/inMemoryUserRepository'

let userRepository: InMemoryUserRepository
let sut: CreateUserService

describe('CreateUserService', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserService(userRepository)
  })
  it('should create a new user', async () => {
    const { user } = await sut.execute({
      name: 'john doe',
      email: 'john_doe@example.com',
      password: '123johndoe',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})

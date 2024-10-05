import { describe, it, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
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

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'john doe',
      email: 'john_doe@example.com',
      password: '123johndoe',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123johndoe',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not register a new user with same email', async () => {
    const email = 'john_doe@example.com'

    await sut.execute({
      name: 'john doe',
      email,
      password: '123johndoe',
    })

    await expect(() =>
      sut.execute({
        name: 'john doe',
        email,
        password: '123johndoe',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})

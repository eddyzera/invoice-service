import { randomUUID } from 'node:crypto'
import { IUserReposity } from '@/repository/userRepository/types'
import { Prisma, User } from '@prisma/client'

export class InMemoryUserRepository implements IUserReposity {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}

import { Prisma, User } from '@prisma/client'

export interface IUserReposity {
  create(data: Prisma.UserCreateInput): Promise<User>
}

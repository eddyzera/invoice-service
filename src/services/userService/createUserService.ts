import { IUserReposity } from '@/repository/userRepository/types'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

export interface ICreateUserServiceRequest {
  name: string
  email: string
  password: string
}

export interface ICreateUserServiceResponse {
  user: User
}

export class CreateUserService {
  constructor(private userRepository: IUserReposity) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserServiceRequest): Promise<ICreateUserServiceResponse> {
    const passwordHash = await hash(password, 6)
    const user = await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return {
      user,
    }
  }
}

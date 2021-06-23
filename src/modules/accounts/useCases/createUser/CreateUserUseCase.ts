import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTOO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private UserRepository: IUserRepository
  ) {}

  async execute({
    password,
    name,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.UserRepository.create({
      password,
      name,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };

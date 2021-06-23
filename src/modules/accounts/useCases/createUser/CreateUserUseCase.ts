import { hash } from "bcrypt";
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
    const passwordHash = await hash(password, 8);

    await this.UserRepository.create({
      password: passwordHash,
      name,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };

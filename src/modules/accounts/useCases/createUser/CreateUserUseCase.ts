import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTOO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private UserRepository: IUserRepository
  ) {}

  async execute({
    password,
    name,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.UserRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

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

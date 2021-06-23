import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTOO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      driver_license,
      email,
      name,
      password,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({ id });
  }
}

export { UserRepository };

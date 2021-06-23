import { ICreateUserDTO } from "../dtos/ICreateUserDTOO";
import { User } from "../entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository };

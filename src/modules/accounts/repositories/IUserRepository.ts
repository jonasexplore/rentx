import { ICreateUserDTO } from "../dtos/ICreateUserDTOO";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUserRepository };

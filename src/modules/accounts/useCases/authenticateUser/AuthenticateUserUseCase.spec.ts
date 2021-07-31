import { verify } from "jsonwebtoken";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUser: CreateUserUseCase;
let authenticateUser: AuthenticateUserUseCase;
let userTokensRepository: UserTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;

interface IPayload {
  sub: string;
}

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUser = new CreateUserUseCase(usersRepositoryInMemory);
    userTokensRepository = new UserTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUser = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepository,
      dateProvider
    );
  });

  it("should be able to authenticate user", async () => {
    const user = {
      name: "Jonas",
      password: "12345678",
      email: "jonas@email.com",
      driver_license: "123456",
    };

    await createUser.execute(user);

    const authenticatedUser = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(authenticatedUser).toHaveProperty("token");
  });

  it("should be return a valid token", async () => {
    const user = {
      name: "Jonas",
      password: "12345678",
      email: "jonas@email.com",
      driver_license: "123456",
    };

    await createUser.execute(user);

    const authenticatedUser = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    const { sub: user_id } = verify(
      authenticatedUser.token,
      "25f54e609455d6be38e1f9506bd3fec7"
    ) as IPayload;

    const foundUser = await usersRepositoryInMemory.findById(user_id);

    expect(foundUser).toBeInstanceOf(User);
  });

  it("should not be authenticate user with invalid credentials", async () => {
    const user = {
      name: "Jonas",
      password: "12345678",
      email: "jonas@email.com",
      driver_license: "123456",
    };

    await createUser.execute(user);

    expect(async () => {
      await authenticateUser.execute({
        email: user.email,
        password: "1234",
      });
    }).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});

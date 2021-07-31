import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgetPasswordMailUseCase } from "./SendForgetPaswordMailUseCase";

let sendForgetPasswordMailUseCase: SendForgetPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UserTokenRepositoryInMemory;
let dataProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UserTokenRepositoryInMemory();
    dataProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgetPasswordMailUseCase = new SendForgetPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dataProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepository.create({
      driver_license: "672138",
      email: "email@test.com",
      name: "test",
      password: "password",
    });

    await sendForgetPasswordMailUseCase.execute("email@test.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgetPasswordMailUseCase.execute("nonexistentmail@test.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an users tokens", async () => {
    const generatedTokenMail = spyOn(usersTokensRepository, "create");

    await usersRepository.create({
      driver_license: "892138",
      email: "email2@test.com",
      name: "test2",
      password: "password",
    });

    await sendForgetPasswordMailUseCase.execute("email2@test.com");

    expect(generatedTokenMail).toBeCalled();
  });
});

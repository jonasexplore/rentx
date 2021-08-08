import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgetPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUserRepository,

    @inject("UsersTokensRepository")
    private readonly usersTokensRepository: IUserTokenRepository,

    @inject("DayjsDateProvider")
    private readonly dateProvider: IDateProvider,

    @inject("MailProvider")
    private readonly mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = uuid();
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recovery password",
      variables,
      templatePath
    );
  }
}

export { SendForgetPasswordMailUseCase };

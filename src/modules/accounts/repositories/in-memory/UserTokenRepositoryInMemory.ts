import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUserTokenRepository } from "../IUserTokenRepository";

class UserTokenRepositoryInMemory implements IUserTokenRepository {
  userTokens: UserTokens[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, data);

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.userTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.userTokens.splice(userTokenIndex, 1);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }
}

export { UserTokenRepositoryInMemory };

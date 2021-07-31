import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  _next: NextFunction
): Promise<void> {
  const { authorization } = request.headers;

  const usersTokensRepository = new UsersTokensRepository();

  if (!authorization) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const userExists = usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userExists) {
      throw new AppError("User does not exists", 404);
    }

    request.user = {
      id: user_id,
    };

    _next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  _next: NextFunction
): Promise<void> {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "25f54e609455d6be38e1f9506bd3fec7"
    ) as IPayload;

    const usersRepository = new UserRepository();
    const userExists = usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User does not exists", 404);
    }

    _next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}

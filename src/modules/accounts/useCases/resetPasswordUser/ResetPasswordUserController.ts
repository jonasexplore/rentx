import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );

    await resetPasswordUserUseCase.execute({
      token: String(request.query.token),
      password: request.body.password,
    });

    return response.json();
  }
}

export { ResetPasswordUserController };

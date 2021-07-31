import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgetPasswordMailUseCase } from "./SendForgetPaswordMailUseCase";

class SendForgetPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sendForgetPasswordMailUseCase = container.resolve(
      SendForgetPasswordMailUseCase
    );

    await sendForgetPasswordMailUseCase.execute(request.body.email);

    return response.json();
  }
}

export { SendForgetPasswordMailController };

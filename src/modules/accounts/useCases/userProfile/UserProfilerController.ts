import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserProfileUseCase } from "./UserProfileUseCase";

class UserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userProfile = container.resolve(UserProfileUseCase);

    const user = await userProfile.execute(request.user.id);

    return response.json(user);
  }
}

export { UserProfileController };

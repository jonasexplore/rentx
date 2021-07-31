import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgetPasswordMailController } from "@modules/accounts/useCases/sendForgetPasswordMail/SendForgetPasswordMailController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgetPasswordMailController = new SendForgetPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);
authenticateRoutes.post(
  "/recovery-password",
  sendForgetPasswordMailController.handle
);
authenticateRoutes.post("/reset-password", resetPasswordUserController.handle);

export { authenticateRoutes };

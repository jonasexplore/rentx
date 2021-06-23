import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const userRouter = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRouter.post("/", createUserController.handle);
userRouter.patch("/avatar", updateUserAvatarController.handle);

export { userRouter };

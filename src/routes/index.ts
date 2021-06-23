import { Router } from "express";

import { categoriesRoutes } from "./caterories.routes";
import { specificationRoutes } from "./specification.routes";
import { userRouter } from "./users.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationRoutes);
routes.use("/users", userRouter);

export { routes };

import { Router } from "express";

import { categoriesRoutes } from "./caterories.routes";
import { specificationRoutes } from "./specification.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationRoutes);

export { routes };

import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./caterories.routes";
import { rentalRoutes } from "./rentals.routes";
import { specificationRoutes } from "./specification.routes";
import { userRouter } from "./users.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationRoutes);
routes.use("/users", userRouter);
routes.use("/cars", carsRoutes);
routes.use("/rentals", rentalRoutes);

routes.use(authenticateRoutes);

export { routes };

import { Router } from "express";
import {
  UpdateDeveloperController,
  createDeveloperController,
  deleteDeveloperController,
  insertDeveloperInfosController,
  readDevelopersByIdController,
} from "../controllers/developers.controller";
import {
  developerEmailExistMiddleware,
  developersIdExixtMiddleware,
} from "../middlewares/developers.middleware";
import {
  verifyDeveloperIdExixtsMiddleware,
  verifyPreferredOsMiddleware,
} from "../middlewares/developerInfos.middleware";

const developersRouter: Router = Router();

developersRouter.post(
  "",
  developerEmailExistMiddleware,
  createDeveloperController
);
developersRouter.get(
  "/:id",
  developersIdExixtMiddleware,
  readDevelopersByIdController
);
developersRouter.patch(
  "/:id",
  developersIdExixtMiddleware,
  developerEmailExistMiddleware,
  UpdateDeveloperController
);
developersRouter.delete(
  "/:id",
  developersIdExixtMiddleware,
  deleteDeveloperController
);
developersRouter.post(
  "/:id/infos",
  developersIdExixtMiddleware,
  verifyDeveloperIdExixtsMiddleware,
  verifyPreferredOsMiddleware,
  insertDeveloperInfosController
);

export default developersRouter;

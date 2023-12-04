import { Router } from "express";
import {
  createProjectController,
  projectUpdateController,
  readProjectsByIdController,
} from "../controllers/projects.controller";
import {
  developerIdExixtMiddleware,
  projectIdExixtMiddleware,
} from "../middlewares/projects.middleware";

const projectsRouter: Router = Router();

projectsRouter.post("", developerIdExixtMiddleware, createProjectController);
projectsRouter.get(
  "/:id",
  projectIdExixtMiddleware,
  readProjectsByIdController
);
projectsRouter.patch(
  "/:id",
  projectIdExixtMiddleware,
  developerIdExixtMiddleware,
  projectUpdateController
);

export default projectsRouter;

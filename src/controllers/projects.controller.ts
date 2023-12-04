import { Request, Response } from "express";
import {
  createProjectService,
  projectUpdateService,
  readProjectService,
} from "../services/projects.service";
import { Projects } from "../interfaces/projects.interface";

const createProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const createProject: Projects = await createProjectService(req.body);
  return res.status(201).json(createProject);
};

const readProjectsByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const readProject = await readProjectService(req.params.id);
  return res.status(200).json(readProject);
};

const projectUpdateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updateproject = await projectUpdateService(req.body, req.params.id);
  return res.status(200).json(updateproject);
};

export {
  readProjectsByIdController,
  createProjectController,
  projectUpdateController,
};

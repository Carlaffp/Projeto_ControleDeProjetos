import { Request, Response } from "express";
import {
  createDeveloperService,
  deleteDeveloperService,
  insertDeveloperInfosService,
  readDeveloperService,
  updateDeveloperService,
} from "../services/developers.service";

const createDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const create = await createDeveloperService(req.body);

  return res.status(201).json(create);
};

const readDevelopersByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const read = await readDeveloperService(req.params.id);
  return res.status(200).json(read);
};

const UpdateDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const update = await updateDeveloperService(req.body, req.params.id);
  return res.status(200).json(update);
};

const deleteDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const deletedDeveloper = await deleteDeveloperService(req.params.id);
  const del = deletedDeveloper;
  return res.status(204).send();
};

const insertDeveloperInfosController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const insertInfos = await insertDeveloperInfosService(
    req.body,
    req.params.id
  );
  return res.status(201).json(insertInfos);
};

export {
  createDeveloperController,
  readDevelopersByIdController,
  UpdateDeveloperController,
  deleteDeveloperController,
  insertDeveloperInfosController,
};

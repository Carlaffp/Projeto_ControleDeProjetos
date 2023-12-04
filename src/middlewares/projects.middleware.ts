import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { Projects, ProjectsResult } from "../interfaces/projects.interface";
import AppError from "../error";

const developerIdExixtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.body.developerId;
  if (id) {
    const queryTemplate: string = `
    SELECT *FROM developers WHERE id = $1
    `;
    const queryConfig: QueryConfig = {
      text: queryTemplate,
      values: [id],
    };

    const queryResult: ProjectsResult = await client.query(queryConfig);
    const foundDeveloperId: Projects = queryResult.rows[0];

    if (!foundDeveloperId) {
      throw new AppError("Developer not found.", 404);
    }
  }

  return next();
};

const projectIdExixtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  const queryTemplate: string = `
      SELECT * FROM projects WHERE id = $1
      `;
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [Number(id)],
  };

  const queryResult: ProjectsResult = await client.query(queryConfig);
  const foundDeveloperId: Projects = queryResult.rows[0];

  if (!foundDeveloperId) {
    throw new AppError("Project not found.", 404);
  }
  return next();
};

export { developerIdExixtMiddleware, projectIdExixtMiddleware };

import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import {
  Developers,
  DevelopersResult,
} from "../interfaces/developers.interface";
import { client } from "../database";
import AppError from "../error";

const developersIdExixtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  const queryTemplate: string = `
    SELECT *FROM "developers" WHERE "id" = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [Number(id)],
  };

  const queryResult: DevelopersResult = await client.query(queryConfig);
  const foundDeveloperId: Developers = queryResult.rows[0];

  if (!foundDeveloperId) {
    throw new AppError("Developer not found.", 404);
  }
  return next();
};

const developerEmailExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const queryTemplate: string = `
    SELECT * FROM "developers" WHERE "email" = $1;
    `;
  const queryResult: DevelopersResult = await client.query(queryTemplate, [
    req.body.email,
  ]);
  const foundDeveloperEmail: Developers = queryResult.rows[0];
  if (foundDeveloperEmail) {
    throw new AppError("Email already exists.", 409);
  }
  return next();
};

export { developersIdExixtMiddleware, developerEmailExistMiddleware };

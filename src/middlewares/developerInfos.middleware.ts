import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../error";

const verifyDeveloperIdExixtsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  const queryInfoExisting: string = `
  SELECT * FROM "developerInfos"
  WHERE "developerId" = $1 ;
  `;
  const queryInfoExistingResult = await client.query(queryInfoExisting, [id]);

  if (queryInfoExistingResult.rows.length > 0) {
    throw new AppError("Developer infos already exists.", 409);
  }

  return next();
};

const verifyPreferredOsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const preferredOS = req.body.preferredOS;
  const validPreferredOs = ["Windows", "Linux", "MacOS"];
  if (!validPreferredOs.includes(preferredOS)) {
    throw new AppError("Invalid OS option", 400);
  }
  return next();
};

export { verifyDeveloperIdExixtsMiddleware, verifyPreferredOsMiddleware };

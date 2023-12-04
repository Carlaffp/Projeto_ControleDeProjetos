import { QueryConfig } from "pg";
import { client } from "../database";
import {
  Developers,
  DevelopersCreate,
  DevelopersResult,
  DevelopersUpdate,
} from "../interfaces/developers.interface";
import format from "pg-format";
import {
  DeveloperInfoResult,
  DeveloperInfoUpdate,
} from "../interfaces/developerInfo.intarface";

const createDeveloperService = async (
  payload: DevelopersCreate
): Promise<Developers> => {
  const queryFormat: string = format(
    ` INSERT INTO "developers" (%I)
  VALUES (%L)
  RETURNING * ;
  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: DevelopersResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

const readDeveloperService = async (id: string): Promise<Developers> => {
  const queryTemplate: string = `
  SELECT 
  d.id "developerId",
  d.name "developerName",
  d.email "developerEmail",
  di."developerSince" "developerInfoDeveloperSince",
  di."preferredOS" "developerInfoPreferredOS"
  FROM "developers" AS d
  LEFT JOIN "developerInfos" AS di
  ON di."developerId" = d.id
  WHERE d.id =$1`;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: Object.values(id),
  };

  const queryResult: DevelopersResult = await client.query(queryConfig);
  return queryResult.rows[0];
};

const updateDeveloperService = async (
  payload: any,
  id: string
): Promise<DevelopersUpdate> => {
  const updateColumns: string[] = Object.keys(payload);
  const updateValues: string[] = Object.values(payload);
  const queryTemplate: string = `
  UPDATE developers
  SET (%I)=ROW(%L)
  WHERE id = $1
  RETURNING *;
  `;
  const queryFormat: string = format(
    queryTemplate,
    updateColumns,
    updateValues
  );

  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [id],
  };
  const queryResult: DevelopersResult = await client.query(queryConfig);
  return queryResult.rows[0];
};

const deleteDeveloperService = async (id: string) => {
  const queryTemplate: string = `
  DELETE FROM developers
  WHERE id = $1
  `;
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [id],
  };
  const queryResult: DevelopersResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

const insertDeveloperInfosService = async (
  payload: any,
  id: string
): Promise<DeveloperInfoUpdate> => {
  payload.developerId = id;
  const queryFormat: string = format(
    `
  INSERT INTO "developerInfos" (%I)
  VALUES (%L)
  RETURNING *;
  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: DeveloperInfoResult = await client.query(queryFormat);

  return queryResult.rows[0];
};
export {
  createDeveloperService,
  readDeveloperService,
  updateDeveloperService,
  deleteDeveloperService,
  insertDeveloperInfosService,
};

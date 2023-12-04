import { QueryConfig } from "pg";
import { client } from "../database";
import {
  ProjectSUpdate,
  Projects,
  ProjectsCreate,
  ProjectsResult,
} from "../interfaces/projects.interface";
import format from "pg-format";

const createProjectService = async (
  payload: ProjectsCreate
): Promise<Projects> => {
  const queryTemplate: string = format(
    `
    INSERT INTO projects (%I)
    VALUES (%L)
    RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: ProjectsResult = await client.query(queryTemplate);
  return queryResult.rows[0];
};

const readProjectService = async (id: string): Promise<Projects> => {
  const queryTemplate: string = `
  SELECT 
  p.id "projectId",
  p.name "projectName",
  p.description "projectDescription",
  p.repository "projectRepository",
  p."startDate" "projectStartDate",
  p."endDate" "projectEndDate",
  d.name "projectDeveloperName"
  FROM "projects" AS p
  LEFT JOIN "developers" AS d
  ON p."developerId" = d.id
  WHERE p.id =$1;`;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [Number(id)],
  };
  const queryResult: ProjectsResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

const projectUpdateService = async (
  payload: any,
  id: string
): Promise<ProjectSUpdate> => {
  const updateColumns: string[] = Object.keys(payload);
  const updateValues: string[] = Object.values(payload);
  const queryTemplate: string = `
  UPDATE projects
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
  const queryResult: ProjectsResult = await client.query(queryConfig);
  return queryResult.rows[0];
};

export { readProjectService, createProjectService, projectUpdateService };

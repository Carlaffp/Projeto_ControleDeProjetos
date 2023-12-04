import { QueryResult } from "pg";
interface Projects {
  id: number;
  name: string;
  description: Text;
  repository: string;
  startDate: Date;
  endDate: Date | undefined | null;
  developerId: number | undefined | null;
}
type ProjectsCreate = Omit<Projects, "id">;
type ProjectSUpdate = Partial<Projects>;
type ProjectsResult = QueryResult<Projects>;
export { Projects, ProjectsCreate, ProjectsResult, ProjectSUpdate };

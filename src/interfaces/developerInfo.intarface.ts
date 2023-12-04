import { QueryResult } from "pg";
interface DeveloperInfos {
  id: number;
  developerSince: Date;
  preferredOs: "Windows" | "Linux" | "MacOs" | string;
  developerId: number;
}
type DeveloperInfoCreate = Omit<DeveloperInfos, "id">;
type DeveloperInfoUpdate = Partial<DeveloperInfos>;
type DeveloperInfoResult = QueryResult<DeveloperInfos>;

export {
  DeveloperInfos,
  DeveloperInfoCreate,
  DeveloperInfoResult,
  DeveloperInfoUpdate,
};

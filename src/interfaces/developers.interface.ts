import { QueryResult } from "pg";

interface Developers {
  id: number;
  name: string;
  email: string;
}

type DevelopersCreate = Omit<Developers, "id">;
type DevelopersUpdate = Partial<Developers>;
type DevelopersResult = QueryResult<Developers>;

export { Developers, DevelopersCreate, DevelopersResult, DevelopersUpdate };

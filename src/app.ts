import "express-async-errors";
import express, { Application, json } from "express";
import "dotenv/config";
import handleMiddleware from "./middlewares/handle.middleware";
import developersRouter from "./routers/developers.router";
import projectsRouter from "./routers/projects.router";

const app: Application = express();
app.use(json());

app.use("/developers", developersRouter);
app.use("/projects", projectsRouter);

app.use(handleMiddleware.erro);

export default app;

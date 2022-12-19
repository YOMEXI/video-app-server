import express, { Application, Request, Response } from "express";

const app: Application = express();
app.use(express.json());

//routes

//routes path

app.get("/", (req: Request, res: Response) => {
  res.send("yomzi  no");
});

export { app };

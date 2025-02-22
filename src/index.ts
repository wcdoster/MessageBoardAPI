import express, { Express, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
const dotenv = require("dotenv");
const cors = require("cors");
const users = require("./routes/users");
const boards = require("./routes/boards");
const posts = require("./routes/posts");
const comments = require("./routes/comments");

dotenv.config();

export const prisma = new PrismaClient();

const app: Express = express();
const port = process.env.PORT ?? 3000;

const corsOptions = {
  origin: "http://localhost:5173",
};

const main = async (): Promise<void> => {
  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  // router routes
  app.use("/users", users as Router);
  app.use("/boards", boards as Router);
  app.use("/posts", posts as Router);
  app.use("/comments", comments as Router);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

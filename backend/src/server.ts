import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";
import { routes } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

// -- Configuração para o diretorio tmp --
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  });


app.listen(3333, () => console.log("Server Iniciado on port 3333"));

import express, { Application } from "express";
import { Server, createServer } from "http";
import cors from "cors";
import path from "path";

import { mongoConnect } from "./database/mongo";
import RoutesApi from "./app/routes/RoutesApi";

class App {
  private readonly _app: Application;
  private readonly _server: Server;

  constructor() {
    this._app = express();
    this._server = createServer(this._app);
    this.middlewares();
    this.routes();
    this.db();
  }

  public get server() {
    return this._server;
  }

  private middlewares(): void {
    this._app.use(cors());
    this._app.use(express.static(path.join(__dirname, "../public")));
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this._app.use("/api", new RoutesApi().startRoutes().router);
  }

  private async db(): Promise<void> {
    await mongoConnect();
  }
}

export default App;

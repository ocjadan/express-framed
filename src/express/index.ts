import * as express from "express";
import Environment from "../common/environment";
import PathProvider from "../common/pathProvider";
import ExpressRouter from "./router";

export default class Express {
  #app: express.Application;
  #environment: Environment;
  #pathProvider: PathProvider;
  #questionsRouter: ExpressRouter;

  constructor(
    environment: Environment,
    pathProvider: PathProvider,
    questionsRouter: ExpressRouter
  ) {
    this.#app = express();
    this.#environment = environment;
    this.#pathProvider = pathProvider;
    this.#questionsRouter = questionsRouter;
  }

  start() {
    this.initializeRoutes();
    this.listen();
  }

  private initializeRoutes() {
    const app = this.#app;

    app.get(this.#questionsRouter.path, this.#questionsRouter.init());

    app.get("/", (req, res) => {
      res.json({
        content: "Hello, you've reached the Express-Framed API.",
        links: {
          questions: this.#pathProvider.questions,
        },
      });
    });
  }

  private listen() {
    const port = this.#environment.port;
    this.#app.listen(port, () => {
      console.log(`Express-Framed listening on port ${port}`);
    });
  }
}

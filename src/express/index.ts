import * as express from "express";
import Environment from "../common/environment";
import PathProvider from "../common/pathProvider";
import ExpressRouter from "./router";

export default class Express {
  #app: express.Application;
  #environment: Environment;
  #pathProvider: PathProvider;
  #questionsRouter: ExpressRouter;
  #graphRouter: ExpressRouter;

  constructor(
    environment: Environment,
    pathProvider: PathProvider,
    questionsRouter: ExpressRouter,
    graphRouter: ExpressRouter
  ) {
    this.#app = express();
    this.#environment = environment;
    this.#pathProvider = pathProvider;
    this.#questionsRouter = questionsRouter;
    this.#graphRouter = graphRouter;
  }

  start() {
    this.initializeRoutes();
    this.listen();
  }

  private initializeRoutes() {
    const app = this.#app;

    app.use(this.#questionsRouter.path, this.#questionsRouter.router);
    app.use(this.#graphRouter.path, this.#graphRouter.router);

    app.get("/", (req, res) => {
      res.json({
        content: "Hello, you've reached the Express-Framed API.",
        links: {
          questions: this.#pathProvider.questions,
          graphql: this.#pathProvider.graph,
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

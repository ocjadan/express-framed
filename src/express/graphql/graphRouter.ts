import { Router } from "express";
import { PathParams } from "express-serve-static-core";
import PathProvider from "../../common/pathProvider";
import ExpressRouter from "../router";
import GraphController from "../../graphql/graphController";

export default class GraphRouter extends ExpressRouter {
  #pathProvider: PathProvider;
  #graphController: GraphController;

  constructor(pathProvider: PathProvider, graphController: GraphController) {
    super();
    this.#pathProvider = pathProvider;
    this.#graphController = graphController;
  }

  get path(): PathParams {
    return this.#pathProvider.graph;
  }

  get router(): Router {
    const router = Router();
    router.use("/", this.#graphController.middleware);
    return router;
  }
}

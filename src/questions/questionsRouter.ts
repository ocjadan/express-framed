import { Router } from "express";
import PathProvider from "../common/pathProvider";
import ExpressRouter from "../express/router";
import QuestionsController from "./questionsController";

export default class QuestionsRouter implements ExpressRouter {
  #pathProvider: PathProvider;
  #controller: QuestionsController;

  constructor(pathProvider: PathProvider, controller: QuestionsController) {
    this.#pathProvider = pathProvider;
    this.#controller = controller;
  }

  get path() {
    return this.#pathProvider.questions;
  }

  init(): Router {
    const router = Router();
    const path = this.path;

    router.get(path, this.#controller.getQuestions);

    return router;
  }
}

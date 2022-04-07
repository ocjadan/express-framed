import { Router } from "express";
import PathProvider from "../../common/pathProvider";
import QuestionsController from "../../questions/questionsController";
import ExpressRouter from "../router";

export default class QuestionsRouter implements ExpressRouter {
  #pathProvider: PathProvider;
  #questionsController: QuestionsController;

  constructor(
    pathProvider: PathProvider,
    questionsController: QuestionsController
  ) {
    this.#pathProvider = pathProvider;
    this.#questionsController = questionsController;
  }

  get path() {
    return this.#pathProvider.questions;
  }

  get router(): Router {
    const router = Router();
    router.get("/", this.#questionsController.getQuestions);
    return router;
  }
}

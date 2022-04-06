import QuestionsController from "../questions/questionsController";
import AppCompositionRoot from "./appCompositionRoot";

export default class ControllerCompositionRoot {
  #appCompositionRoot: AppCompositionRoot;

  constructor(appCompositionRoot: AppCompositionRoot) {
    this.#appCompositionRoot = appCompositionRoot;
  }

  get questionsController(): QuestionsController {
    return new QuestionsController(
      this.#appCompositionRoot.fetchQuestionsUseCase
    );
  }
}

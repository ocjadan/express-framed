import GraphController from "../graphql/graphController";
import QuestionsGraphController from "../graphql/questions/questionsGraphController";
import AppCompositionRoot from "./appCompositionRoot";

export default class GraphCompositionRoot {
  #appCompositionRoot: AppCompositionRoot;

  constructor(appCompositionRoot: AppCompositionRoot) {
    this.#appCompositionRoot = appCompositionRoot;
  }

  get graphController(): GraphController {
    return new GraphController(this.questionsGraphController);
  }

  get questionsGraphController(): QuestionsGraphController {
    return new QuestionsGraphController(
      this.#appCompositionRoot.fetchQuestionsUseCase
    );
  }
}

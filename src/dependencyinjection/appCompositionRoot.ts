import Express from "../express";
import Environment from "../common/environment";
import ExpressRouter from "../express/router";
import QuestionsRouter from "../questions/questionsRouter";
import PathProvider from "../common/pathProvider";
import ControllerCompositionRoot from "./controllerCompositionRoot";
import FetchQuestionsUseCase from "../questions/fetchQuestionsUseCase";
import FetchQuestionsEndpoint from "../networking/questions/fetchQuestionsEndpoint";
import { StackOverflowApi } from "../networking/stackOverflowApi";
import StackOverflowInstance from "../axios/stackoverflow/stackOverflowInstance";
import UrlProvider from "../common/urlProvider";

export default class AppCompositionRoot {
  #app: Express;

  get app() {
    if (this.#app == null) {
      this.#app = new Express(
        this.environment,
        this.pathProvider,
        this.questionsRouter
      );
    }
    return this.#app;
  }

  get environment(): Environment {
    return new Environment();
  }

  get pathProvider(): PathProvider {
    return new PathProvider();
  }

  get urlProvider(): UrlProvider {
    return new UrlProvider();
  }

  get questionsRouter(): ExpressRouter {
    return new QuestionsRouter(
      this.pathProvider,
      this.controllerCompositionRoot.questionsController
    );
  }

  get controllerCompositionRoot(): ControllerCompositionRoot {
    return new ControllerCompositionRoot(this);
  }

  get fetchQuestionsUseCase(): FetchQuestionsUseCase {
    return new FetchQuestionsUseCase(this.fetchQuestionsEndpoint);
  }

  get fetchQuestionsEndpoint(): FetchQuestionsEndpoint {
    return new FetchQuestionsEndpoint(this.stackOverflowApi);
  }

  get stackOverflowApi(): StackOverflowApi {
    return new StackOverflowInstance(this.urlProvider);
  }
}

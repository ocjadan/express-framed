import Express from "../express";
import Environment from "../common/environment";
import ExpressRouter from "../express/router";
import QuestionsRouter from "../express/questions/questionsRouter";
import PathProvider from "../common/pathProvider";
import ControllerCompositionRoot from "./controllerCompositionRoot";
import FetchQuestionsUseCase from "../questions/fetchQuestionsUseCase";
import FetchQuestionsEndpoint from "../networking/questions/fetchQuestionsEndpoint";
import { StackOverflowApi } from "../networking/stackOverflowApi";
import StackOverflowInstance from "../axios/stackoverflow/stackOverflowInstance";
import UrlProvider from "../common/urlProvider";
import GraphRouter from "../express/graphql/graphRouter";
import GraphCompositionRoot from "./graphCompositionRoot";

export default class AppCompositionRoot {
  #app: Express;
  #controllerCompositionRoot: ControllerCompositionRoot;
  #graphCompositionRoot: GraphCompositionRoot;

  get app() {
    if (this.#app == null) {
      this.#app = new Express(
        this.environment,
        this.pathProvider,
        this.questionsRouter,
        this.graphRouter
      );
    }
    return this.#app;
  }

  get controllerCompositionRoot(): ControllerCompositionRoot {
    if (this.#controllerCompositionRoot == null) {
      this.#controllerCompositionRoot = new ControllerCompositionRoot(this);
    }
    return this.#controllerCompositionRoot;
  }

  get graphCompositionRoot(): GraphCompositionRoot {
    if (this.#graphCompositionRoot == null) {
      this.#graphCompositionRoot = new GraphCompositionRoot(this);
    }
    return this.#graphCompositionRoot;
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

  get graphRouter(): ExpressRouter {
    return new GraphRouter(
      this.pathProvider,
      this.graphCompositionRoot.graphController
    );
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

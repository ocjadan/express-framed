import { GraphQLFieldConfig, GraphQLList } from "graphql";
import FetchQuestionsUseCase from "../../questions/fetchQuestionsUseCase";
import QuestionsObjectType from "./questionObjectType";

export default class QuestionsGraphController {
  #fetchQuestionsUseCase: FetchQuestionsUseCase;

  constructor(fetchQuestionsUseCase: FetchQuestionsUseCase) {
    this.#fetchQuestionsUseCase = fetchQuestionsUseCase;
  }

  getQuestions(): GraphQLFieldConfig<any, any, any> {
    return {
      type: new GraphQLList(QuestionsObjectType),
      description: "List of new StackOverflow questions",
      resolve: async () => {
        return await this.#fetchQuestionsUseCase.getQuestions();
      },
    };
  }
}

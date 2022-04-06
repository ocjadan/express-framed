import FetchQuestionsEndpoint from "../networking/questions/fetchQuestionsEndpoint";
import { Question } from "./question";

export default class FetchQuestionsUseCase {
  #fetchQuestionsEndpoint: FetchQuestionsEndpoint;

  constructor(fetchQuestionsEndpoint: FetchQuestionsEndpoint) {
    this.#fetchQuestionsEndpoint = fetchQuestionsEndpoint;
  }

  getQuestions = async (): Promise<Question[]> => {
    return this.fetchQuestionsFromEndpoint();
  };

  private fetchQuestionsFromEndpoint = async (): Promise<Question[]> => {
    try {
      return await this.#fetchQuestionsEndpoint.fetchQuestions();
    } catch (e) {
      switch (e.name) {
        case "Error":
          throw 500;
      }
      throw e;
    }
  };

  private getQuestionsFromDb = async (): Promise<Question[]> => {
    return [];
  };
}

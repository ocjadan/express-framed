import { QuestionSchema } from "./questionSchema";
import { Question } from "../../questions/question";
import { StackOverflowApi } from "../stackOverflowApi";
import { OwnerSchema } from "../owners/ownerSchema";
import { Owner } from "../../owners/owner";

export default class FetchQuestionsEndpoint {
  #stackOverflowApi: StackOverflowApi;

  constructor(stackOverflowApi: StackOverflowApi) {
    this.#stackOverflowApi = stackOverflowApi;
  }

  fetchQuestions = async (): Promise<Question[]> => {
    try {
      const questionSchemas = await this.#stackOverflowApi.getQuestions();
      return this.mapQuestionSchemasToQuestions(questionSchemas);
    } catch (e) {
      switch (e.name) {
        case "RangeError":
          break;
        case "Error":
          break;
      }
      throw Error("Failure");
    }
  };

  private mapQuestionSchemasToQuestions(schemas: QuestionSchema[]): Question[] {
    return schemas.map((schema) => {
      const owner = this.mapOwnerSchemaToOwner(schema.owner);
      return {
        owner,
        questionId: schema.question_id,
        title: schema.title,
        creationDate: schema.creation_date,
        isAnswered: schema.is_answered,
      };
    });
  }

  private mapOwnerSchemaToOwner(schema: OwnerSchema): Owner {
    return {
      userId: schema.user_id,
      accountId: schema.account_id,
      profileImage: schema.profile_image,
      displayName: schema.display_name,
    };
  }
}

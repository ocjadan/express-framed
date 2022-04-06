import { QuestionSchema } from "./questions/questionSchema";

export interface StackOverflowApi {
  getQuestions(): Promise<QuestionSchema[]>;
}

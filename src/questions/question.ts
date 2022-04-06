import { Owner } from "../owners/owner";

export interface Question {
  owner: Owner;
  questionId: string;
  title: string;
  isAnswered: string;
  creationDate: string;
}

import { OwnerSchema } from "../owners/ownerSchema";

export interface QuestionSchema {
  owner: OwnerSchema;
  question_id: string;
  title: string;
  is_answered: string;
  creation_date: string;
}

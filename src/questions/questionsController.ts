import { Request, Response } from "express";
import FetchQuestionsUseCase from "./fetchQuestionsUseCase";

export default class QuestionsController {
  #fetchQuestionsUseCase: FetchQuestionsUseCase;

  constructor(fetchQuestionsUseCase: FetchQuestionsUseCase) {
    this.#fetchQuestionsUseCase = fetchQuestionsUseCase;
  }

  getQuestions = async (req: Request, res: Response) => {
    try {
      const result = await this.#fetchQuestionsUseCase.getQuestions();
      res.json({ questions: result });
    } catch (e) {
      switch (e) {
        case 500:
          res.sendStatus(500);
          break;
      }
    }
  };
}

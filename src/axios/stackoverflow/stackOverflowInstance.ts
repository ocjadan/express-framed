import {
  Instance,
  AxiosInstanceFactory,
  RequestConfig,
  RequestResponse,
} from "..";
import UrlProvider from "../../common/urlProvider";
import { JsonObj } from "../../networking/jsonObj";
import { QuestionSchema } from "../../networking/questions/questionSchema";
import { StackOverflowApi } from "../../networking/stackOverflowApi";

export default class StackOverflowInstance implements StackOverflowApi {
  #instance: Instance;

  constructor(urlProvider: UrlProvider) {
    this.#instance = AxiosInstanceFactory.newInstance()
      .setBaseUrl(urlProvider.stackOverflowUrl)
      .setParams({ site: "stackoverflow" })
      .build();
  }

  /**
   * @throws Error if `items` is not present
   */
  getQuestions = async (): Promise<QuestionSchema[]> => {
    const config: RequestConfig = {
      url: "questions",
      method: "GET",
    };

    const result = await this.request(config);
    const items = result.data.items;

    // Expecting an array of items
    if (!Array.isArray(items)) {
      throw Error("Expected array of items");
    }

    return this.mapItemsToQuestionSchemas(items);
  };

  /**
   * @throws RangeError when status code not 2xx
   * @throws Error for anything else
   */
  private request = async (config: RequestConfig): Promise<RequestResponse> => {
    try {
      return await this.#instance.request(config);
    } catch (e) {
      if (e.response != null) {
        // The request was made and the server responded with a status code out of 2xx
        throw RangeError("IO Exception");
      } else {
        if (e.request != null) {
          // The request was made but no response was received,
          // request will be an instance of `http.ClientRequest`
        }
        throw Error();
      }
    }
  };

  private mapItemsToQuestionSchemas(items: JsonObj[]): QuestionSchema[] {
    return items.map((item) => {
      const owner = item.owner as JsonObj;
      return {
        owner: {
          user_id: `${owner.user_id}`,
          account_id: `${owner.account_id}`,
          profile_image: `${owner.profile_image}`,
          display_name: `${owner.display_name}`,
        },
        question_id: `${item.question_id}`,
        title: `${item.title}`,
        is_answered: `${item.is_answered}`,
        creation_date: `${item.creation_date}`,
      };
    });
  }
}

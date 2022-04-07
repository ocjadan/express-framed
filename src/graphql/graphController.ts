import { graphqlHTTP, OptionsData } from "express-graphql";
import { GraphQLObjectType, GraphQLSchema, GraphQLSchemaConfig } from "graphql";
import QuestionsGraphController from "./questions/questionsGraphController";

export default class GraphController {
  #questionsGraphController: QuestionsGraphController;

  constructor(questionsGraphController: QuestionsGraphController) {
    this.#questionsGraphController = questionsGraphController;
  }

  get middleware() {
    return graphqlHTTP(this.options);
  }

  private get options(): OptionsData {
    return {
      schema: this.schema,
      graphiql: true,
    };
  }

  private get schema(): GraphQLSchema {
    return new GraphQLSchema(this.schemaConfig);
  }

  private get schemaConfig(): GraphQLSchemaConfig {
    return {
      query: this.query,
    };
  }

  private get query(): GraphQLObjectType {
    return new GraphQLObjectType({
      name: "Query",
      fields: {
        questions: this.#questionsGraphController.getQuestions(),
      },
    });
  }
}

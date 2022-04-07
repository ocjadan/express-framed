import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "Question",
  fields: {
    questionId: { type: GraphQLString },
    isAnswered: { type: GraphQLString },
    title: { type: GraphQLString },
    creationDate: { type: GraphQLString },
  },
});

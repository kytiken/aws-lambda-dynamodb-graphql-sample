import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    contents: { type: GraphQLString }
  }
});

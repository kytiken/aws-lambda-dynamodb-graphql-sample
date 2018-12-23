import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchemaConfig
} from "graphql";

const postType = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    contents: { type: GraphQLString }
  }
});

const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: postType,
      resolve: () => {
        return {
          id: "hgeowjfoiwej",
          title: "hoge",
          contents: "fuga"
        };
      }
    }
  }
});

// const mutation: GraphQLObjectType = {
//   name: "Mutation",
//   fields: {}
// };

const config: GraphQLSchemaConfig = {
  query
};

export default new GraphQLSchema(config);

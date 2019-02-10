import { GraphQLList } from "graphql";
import postType from "./PostType";

export default new GraphQLList(postType);

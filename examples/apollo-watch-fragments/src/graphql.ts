import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";

const Todo = new GraphQLObjectType({
  name: "Todo",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isCompleted: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
});

const TodosConnection = new GraphQLObjectType({
  name: "TodosConnection",
  fields: {
    edges: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "TodosConnectionEdge",
          fields: {
            node: {
              type: Todo,
            },
          },
        })
      ),
    },
  },
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      todos: {
        type: TodosConnection,
      },
    },
  }),
});

export const client = new ApolloClient({
  link: new SchemaLink({
    schema,
    rootValue: {
      todos: {
        edges: [
          {
            node: {
              id: "Todo:1",
              description: "Go bananas",
              isCompleted: false,
            },
          },
          {
            node: {
              id: "Todo:2",
              description: "Have coffee",
              isCompleted: true,
            },
          },
        ],
      },
    },
  }),
  cache: new InMemoryCache(),
});
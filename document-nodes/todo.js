import gql from "graphql-tag";

// TODO: implement a GET_TODOS query that will be used in the appolloClient
export const GET_TODOS = gql`
query GetTodos {
  todos {
    id
    title
    completed
  }
}
`;

// TODO: implement a ADD_TODOS mutation that will be used in the appolloClient
export const ADD_TODO = gql`
mutation CreateTodo($data: TodoInput!) {
  createTodo(data: $data) {
    title
    completed
  }
}
`;

// TODO: implement a DELETE_TODOS mutation that will be used in the appolloClient
export const DELETE_TODO = gql`
mutation DeleteTodo($id: String!) {
  deleteTodo(id: $id)
}
`;

// TODO: implement a UPDATE_TODOS mutation that will be used in the appolloClient
export const UPDATE_TODO = gql`
mutation UpdateTodo( $id: String!, $data: TodoInput!) {
  updateTodo( id: $id, data: $data) {
    id
    title
    completed
  }
}
`;

export default {
  GET_TODOS,
  DELETE_TODO,
  ADD_TODO,
  UPDATE_TODO,
};

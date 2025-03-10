export const getNonCompletedTodos = (todos) => {
  return todos.filter((todo) => !todo.completed).length;
};

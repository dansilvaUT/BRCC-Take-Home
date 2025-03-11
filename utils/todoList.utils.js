export const getNonCompletedTodos = (todos) => {
  return todos.filter((todo) => !todo.completed).length;
};

export const filterTodos = (todos, search) => {
  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase().trim())
  );
};

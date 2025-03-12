/**
 *
 * @param {Array} todos
 * @returns Array of non completed todos
 */
export const getNonCompletedTodos = (todos) => {
  return todos.filter((todo) => !todo.completed).length;
};

/**
 *
 * @param {Array} todos
 * @param {String} search
 * @returns Array of filtered todos mathcing the search string
 */
export const filterTodos = (todos, search) => {
  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase().trim())
  );
};

/**
 *  Function for formatting the todo object
 * @param {Object} todo
 * @param {Function} cb
 * @param {Boolean} isCompleted
 */
export const formatTodo = (todo, cb, isCompleted = false) => {
  const gqlObj = {
    variables: {
      id: todo.id,
      data: {
        title: todo.title,
        completed: isCompleted,
      },
    },
  };
  cb(gqlObj);
};

export const alertObjMap = {
  addTodo: {
    message: "Todo added",
    severity: "success",
  },
  updateTodo: {
    message: "Todo updated",
    severity: "success",
  },
  errorUpdateTodo: {
    message: "Error updating todo",
    severity: "error",
  },
};

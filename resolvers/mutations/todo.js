const todo = {
  // TODO: Implement the createTodo mutation
  async createTodo(parent, args, context, info) {
    try {
      const todo = await context.models.Todo.create(args.data);
      if (!todo) {
        throw new Error("Failed to create todo");
      }
      return todo;
    } catch (error) {
      console.error("Error creating todo:", error);
    }
    return args.data;
  },

  // TODO: Implement the deleteTodo mutation
  async deleteTodo() {
    return "";
  },

  // TODO: Implement the updateTodo mutation
  async updateTodo() {
    return "";
  },
};

export default todo;

const todo = {
  // TODO: Implement the todos query
  async todos(parent, args, context, info) {
    try {
      const todos = await context.models.Todo.findAll();

      return todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw new Error("Failed to fetch todos");
    }
  },
};

export default todo;

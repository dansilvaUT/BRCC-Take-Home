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
  async deleteTodo(parent, args, context, info) {
    try {
      const todo = await context.models.Todo.destroy({
        where: { id: args.id },
      });
      if (!todo) {
        throw new Error("Failed to delete todo");
      }
      return args.id;
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  },

  // TODO: Implement the updateTodo mutation
  async updateTodo(parent, args, context, info) {
    try {
      const updatedTodoRow = await context.models.Todo.update(args.data, {
        where: { id: args.id },
        returning: true,
        plain: true,
      });
      if (!updatedTodoRow[1]) {
        throw new Error("Failed to update todo");
      }
      const updatedTodo = await context.models.Todo.findByPk(args.id);
      return updatedTodo;
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  },
};

export default todo;

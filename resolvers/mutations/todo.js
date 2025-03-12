const todo = {
  async createTodo(parent, args, context, info) {
    try {
      const todo = await context.models.Todo.create(args.data);
      if (!todo) {
        throw new Error("Failed to create todo");
      }
      return todo;
    } catch (error) {
      return error;
    }
  },

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
      return error;
    }
  },

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
      return error;
    }
  },
};

export default todo;

import {resolver} from 'graphql-sequelize';

const todo = {
  todos: resolver(() => ''),
};

export default todo;
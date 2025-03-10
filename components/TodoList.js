import {
  makeStyles,
  List,
  ListItem,
  IconButton,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  Container,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { getNonCompletedTodos } from "../utils/todoList.utils";

import { useMutation } from "@apollo/react-hooks";
import { DELETE_TODO, UPDATE_TODO } from "../document-nodes/todo";

// NOTE: we typically use TypeScript in our codebase, but for this coding assessment we suggest using JSDoc instead.

// TODO: implement styling
const useStyles = makeStyles((theme) => ({
  headerContainer: {
    padding: "0 0 5px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderBottom: "1px solid #ccc",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },

  checkBox: {
    color: "green",
    "&.Mui-checked": {
      color: "#1fb91fb0",
      cursor: "not-allowed",
    },
  },
  trashIcon: {
    color: "#de4043",
  },
}));

// TODO: Update TodoList component to render list items.

const TodoList = ({ todos }) => {
  const classes = useStyles();

  // TODO: implement deleteTodo mutation
  const [deleteTodo, { error: deleteTodoError, data: deletedTodoId }] =
    useMutation(DELETE_TODO, {
      update(cache, { data: { deleteTodo } }) {
        cache.modify({
          fields: {
            todos(existingTodos, { readField }) {
              return existingTodos.filter(
                (todo) => readField("id", todo) !== deleteTodo
              );
            },
          },
        });
      },
    });
  // TODO: implement updateTodo mutation
  const [updateTodo, { error: updateTodoError, data: updatedTodo }] =
    useMutation(UPDATE_TODO);

  // TODO: Render TodoList items
  return (
    <>
      <Container className={classes.headerContainer}>
        <Typography variant="h6">Total Todos ({todos.length})</Typography>
        <Typography variant="h6">
          Incomplete Todos ({getNonCompletedTodos(todos)})
        </Typography>
      </Container>
      <List dense>
        {todos.map((todo) => (
          <ListItem key={todo.id} className={classes.listItem}>
            <ListItemText primary={todo.title} />
            <Checkbox
              className={classes.checkBox}
              checked={todo.completed}
              disabled={todo.completed}
              onChange={() =>
                updateTodo({
                  variables: {
                    id: todo.id,
                    data: { title: todo.title, completed: true },
                  },
                })
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTodo({ variables: { id: todo.id } })}
              >
                <DeleteIcon className={classes.trashIcon} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TodoList;

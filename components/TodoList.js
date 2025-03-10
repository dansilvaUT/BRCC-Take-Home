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
import React, { useState } from "react";
import { getNonCompletedTodos } from "../utils/todoList.utils";

// import {useMutation} from '@apollo/react-hooks';
// import {DELETE_TODO, GET_TODOS, UPDATE_TODO} from '../document-nodes/todo';

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
      color: "green",
    },
  },
}));

// TODO: Update TodoList component to render list items.

const TodoList = ({ todos }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  // TODO: implement deleteTodo mutation
  // TODO: implement updateTodo mutation

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
              onChange={() => setChecked(!checked)}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TodoList;

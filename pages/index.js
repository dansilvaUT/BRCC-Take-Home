import React, { useState } from "react";
import {
  TextField,
  makeStyles,
  Fab,
  Container,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import AddIcon from "@material-ui/icons/Add";
import { useQuery, useMutation } from "@apollo/client";
import TodoList from "../components/TodoList";

import { GET_TODOS, ADD_TODO } from "../document-nodes/todo";
// Styles
const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: theme.spacing(55),
    maxWidth: theme.spacing(55),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

const Index = () => {
  const classes = useStyles();
  // TODO: Implement a useQuery for getting a list of current
  const {
    loading: todosLoading,
    error: todosError,
    data: todosData,
  } = useQuery(GET_TODOS);

  // TODO: Implement a useMutation for adding TODOs to the list
  const [addTodoMutation, { loading: addTodoLoading, error: addTodoError }] =
    useMutation(ADD_TODO, {
      update(cache, { data: { createTodo } }) {
        cache.modify({
          fields: {
            todos(existingTodos = []) {
              return [...existingTodos, createTodo]; // Append new todo directly
            },
          },
        });
      },
    });

  // TODO: implement state variable for todo
  const [newTodo, setNewTodo] = useState({ title: "", completed: false });

  if (todosLoading || addTodoLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (todosError || addTodoError) {
    return <Typography>Error!</Typography>;
  }

  return (
    <Container maxWidth={"sm"}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodoMutation({
            variables: {
              data: newTodo,
            },
          });
          setNewTodo({
            title: "",
            completed: false,
          });
        }}
      >
        <TextField
          id="outlined-dense"
          label="Input task title"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          onChange={(e) =>
            setNewTodo({ title: e.target.value, completed: false })
          }
          value={newTodo.title}
        />
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          type="submit"
        >
          <AddIcon />
        </Fab>
      </form>
      {/* TODO: Render TodoList component and pass todos data */}
      {!todosLoading && <TodoList todos={todosData.todos} />}
    </Container>
  );
};

export default Index;

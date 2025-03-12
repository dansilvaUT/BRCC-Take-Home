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
import { Alert } from "@material-ui/lab";
import { alertObjMap } from "../utils/todoList.utils";

import { GET_TODOS, ADD_TODO } from "../document-nodes/todo";
// Styles
const useStyles = makeStyles((theme) => ({
  inputContainer: {
    position: "relative",
  },
  alert: {
    position: "absolute",
    width: "100%",
    top: "70px",
    zIndex: 5,
  },

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
  const todoObj = { title: "", completed: false };
  const {
    loading: todosLoading,
    error: todosError,
    data: todosData,
  } = useQuery(GET_TODOS);

  const [
    addTodoMutation,
    { data: addedTodo, loading: addTodoLoading, error: addTodoError },
  ] = useMutation(ADD_TODO, {
    onError: (error) => {
      console.error("GraphQL error:", error.message);
    },
    update(cache, { data: { createTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            return [...existingTodos, createTodo];
          },
        },
      });
    },
  });

  const [newTodo, setNewTodo] = useState(todoObj);
  const [alertState, setAlertState] = useState(null);

  React.useEffect(() => {
    if (addedTodo) {
      setAlertState(alertObjMap.addTodo);
      setTimeout(() => {
        setAlertState(null);
      }, 2500);
    }
  }, [addedTodo]);

  if (todosLoading || addTodoLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (todosError || addTodoError) {
    return <Typography>Error!</Typography>;
  }

  return (
    <Container maxWidth={"sm"} className={classes.inputContainer}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!newTodo.title) return;
          addTodoMutation({
            variables: {
              data: newTodo,
            },
          });
          setNewTodo(todoObj);
        }}
      >
        {alertState && (
          <Alert
            variant="filled"
            severity={alertState.severity}
            className={classes.alert}
          >
            {alertState.message}
          </Alert>
        )}
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

      {!todosLoading && <TodoList todos={todosData.todos} />}
    </Container>
  );
};

export default Index;

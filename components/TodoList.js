import {
  makeStyles,
  List,
  ListItem,
  IconButton,
  Checkbox,
  TextField,
  ListItemSecondaryAction,
  Container,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import {
  getNonCompletedTodos,
  filterTodos,
  formatTodo,
  alertObjMap,
} from "../utils/todoList.utils";
import propTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_TODO, UPDATE_TODO } from "../document-nodes/todo";
import FilterSearch from "./FilterSearch";
import { Alert } from "@material-ui/lab";

// NOTE: we typically use TypeScript in our codebase, but for this coding assessment we suggest using JSDoc instead.

// TODO: implement styling
const useStyles = makeStyles(() => ({
  headerContainer: {
    position: "relative",
    padding: "0 0 5px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderBottom: "1px solid #ccc",
  },
  formContainer: {
    position: "relative",
  },
  listItem: {
    display: "flex",
    position: "relative",
    justifyContent: "space-between",
    transition: "1s",
  },
  deleted: {
    right: "-1000px",
    opacity: "0",
  },
  todoField: {
    border: "none",
    "& .MuiInputBase-input": {
      cursor: "pointer",
      border: "none",
    },
    "& .MuiInput-underline:before, & .MuiInput-underline:after": {
      border: "none",
    },
  },
  checkBox: {
    color: "green",
    "&.Mui-checked": {
      color: "#1fb91fb0",
      cursor: "not-allowed",
    },
  },
  iconWrapper: {
    transition: "1.5s",
  },
  trashIcon: {
    color: "#de4043",
  },
  alert: {
    width: "100%",
    zIndex: 5,
    position: "absolute",
  },
}));

const TodoList = ({ todos }) => {
  const classes = useStyles();
  const [search, setSearch] = React.useState("");
  const [editedTodo, setEditedTodo] = React.useState({});
  const [deletingTodo, setDeletingTodo] = React.useState(false);
  const [alertState, setAlertState] = React.useState(null);
  const inputRef = React.useRef({});

  const filteredTodos = filterTodos(todos, search);
  const isEmpty = Object.keys(editedTodo).length === 0;

  const [deleteTodo, { error: deleteTodoError }] = useMutation(DELETE_TODO, {
    onError: (error) => {
      console.error("GraphQL error:", error.message);
    },
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

  const [updateTodo, { error: updateTodoError, data: updatedTodo }] =
    useMutation(UPDATE_TODO, {
      onError: (error) => {
        console.error("GraphQL error:", error.message);
      },
    });

  React.useEffect(() => {
    if (updatedTodo) {
      setAlertState(alertObjMap.updateTodo);
    } else if (updateTodoError) {
      setAlertState(alertObjMap.errorUpdateTodo);
    }

    const timeoutId = setTimeout(() => {
      setAlertState(null);
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [updatedTodo, updateTodoError, deleteTodoError]);

  const handleDeleteFadeOut = (id) => {
    setDeletingTodo(id);
    setTimeout(() => {
      deleteTodo({ variables: { id } });
      setDeletingTodo(false);
    }, 1000);
  };

  const handleSave = (todo) => {
    if (
      !isEmpty &&
      editedTodo.id === todo.id &&
      editedTodo.title !== todo.title
    ) {
      formatTodo(editedTodo, updateTodo);
      inputRef.current[todo.id]?.blur();
    }
  };

  return (
    <>
      <Container className={classes.headerContainer}>
        <Typography variant="h6">Total Todos ({todos.length})</Typography>
        <Typography variant="h6">
          Incomplete Todos ({getNonCompletedTodos(todos)})
        </Typography>
        <FilterSearch search={search} setSearch={setSearch} />
      </Container>
      <form
        className={classes.formContainer}
        onSubmit={(event) => {
          event.preventDefault();

          if (!isEmpty) {
            formatTodo(editedTodo, updateTodo);
            inputRef.current[editedTodo.id]?.blur();
          }
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
        {/* Hidden button so the edited todo can be submitted with enter key */}
        <button type="submit" style={{ display: "none" }} />
        <List dense>
          {filteredTodos.map((todo) => (
            <ListItem
              key={todo.id}
              className={`${classes.listItem} ${
                deletingTodo === todo.id ? classes.deleted : ""
              }`}
            >
              <TextField
                inputRef={(el) => (inputRef.current[todo.id] = el)}
                fullWidth
                value={
                  todo.id === editedTodo.id ? editedTodo.title : todo.title
                }
                disabled={todo.completed}
                className={classes.todoField}
                onChange={(e) =>
                  setEditedTodo({ ...todo, title: e.target.value })
                }
                onBlur={() => handleSave(todo)}
              />
              <Checkbox
                className={classes.checkBox}
                checked={todo.completed}
                disabled={todo.completed}
                onChange={() => formatTodo(todo, updateTodo, true)}
              />
              <ListItemSecondaryAction
                className={`${classes.iconWrapper} ${
                  deletingTodo === todo.id ? classes.deleted : ""
                }`}
              >
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteFadeOut(todo.id)}
                >
                  <DeleteIcon className={classes.trashIcon} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </form>
    </>
  );
};

TodoList.propTypes = {
  todos: propTypes.array,
};

export default TodoList;

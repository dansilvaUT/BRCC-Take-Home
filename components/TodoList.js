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
import { getNonCompletedTodos, filterTodos } from "../utils/todoList.utils";
import propTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_TODO, UPDATE_TODO } from "../document-nodes/todo";
import FilterSearch from "./FilterSearch";
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
  listItem: {
    display: "flex",
    justifyContent: "space-between",
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
  trashIcon: {
    color: "#de4043",
  },
}));

// TODO: Update TodoList component to render list items.
const TodoList = ({ todos }) => {
  const classes = useStyles();
  const [search, setSearch] = React.useState("");
  const [editedTodo, setEditedTodo] = React.useState({});

  const handleSave = (todo) => {
    if (editedTodo.id === todo.id && editedTodo.title !== todo.title) {
      console.log("Save todo", editedTodo);
    }
  };

  // TODO: implement deleteTodo mutation
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

  // TODO: implement updateTodo mutation
  const [updateTodo, { error: updateTodoError, data: updatedTodo }] =
    useMutation(UPDATE_TODO);

  const filteredTodos = filterTodos(todos, search);

  // TODO: Render TodoList items
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
        onSubmit={(event) => {
          event.preventDefault();
          console.log("event");
        }}
      >
        {/* Hidden button so the edited todo can be submitted with enter key */}
        <button type="submit" style={{ display: "none" }} />
        <List dense>
          {filteredTodos.map((todo) => (
            <ListItem key={todo.id} className={classes.listItem}>
              <TextField
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
      </form>
    </>
  );
};

TodoList.propTypes = {
  todos: propTypes.array,
};

export default TodoList;

import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
// import {useMutation} from '@apollo/react-hooks';
// import {DELETE_TODO, GET_TODOS, UPDATE_TODO} from '../document-nodes/todo';

// TODO: implement styling
const useStyles = makeStyles((theme) => ({}));

const TodoList = ({todos}) => {
  const classes = useStyles();

  // TODO: implement deleteTodo mutation
  // TODO: implement updateTodo mutation
  

  // TODO: implement apollo hooks for deleteTodo and updateTodo mutations
  return (
    <>
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;

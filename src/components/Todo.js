import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, selectTodo } from "../actions";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <tr>
      <td>{todo.todo}</td>
      <td>
        <button onClick={() => dispatch(selectTodo(todo.id))}>Edit</button>
      </td>
      <td>
        <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
      </td>
    </tr>
  );
};

export default Todo;

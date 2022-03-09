import React from "react";

const Todo = ({ todo, onEditTodo, onDeleteTodo }) => {
  return (
    <tr>
      <td>{todo.todo}</td>
      <td>
        <button onClick={() => onEditTodo(todo)}>Edit</button>
      </td>
      <td>
        <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Todo;

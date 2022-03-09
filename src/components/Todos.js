import React from "react";
import Todo from "./Todo";

const Todos = ({ todos, onEditTodo, onDeleteTodo }) => {
  //   console.log(todos);
  const renderTodo = todos.map(({ id, todo }) => (
    <Todo
      key={id}
      todo={{ id, todo }}
      onEditTodo={onEditTodo}
      onDeleteTodo={onDeleteTodo}
    />
  ));

  return (
    <table>
      <tbody>{renderTodo}</tbody>
    </table>
  );
};

export default React.memo(Todos);

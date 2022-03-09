import React from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";

const Todos = () => {
  const state = useSelector((state) => state.todos);
  const { todos } = state;

  const renderTodo = todos.map(({ id, todo }) => (
    <Todo key={id} todo={{ id, todo }} />
  ));

  return (
    <table>
      <tbody>{renderTodo}</tbody>
    </table>
  );
};

export default React.memo(Todos);

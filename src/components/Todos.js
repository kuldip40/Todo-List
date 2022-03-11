import React from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";
import { Grid } from "semantic-ui-react";

const Todos = () => {
  const state = useSelector((state) => state.todos);
  const { todos } = state;

  const renderTodo = todos.map(({ id, todo }) => (
    <Todo key={id} todo={{ id, todo }} />
  ));

  return <Grid columns={6}>{renderTodo}</Grid>;
};

export default React.memo(Todos);

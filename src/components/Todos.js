import React from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";
import { Grid } from "semantic-ui-react";

const Todos = ({ onEdit }) => {
  const state = useSelector((state) => state.todos);
  const { todos } = state;

  const renderTodo = todos.map(({ id, todo }) => (
    <Todo key={id} todo={{ id, todo }} onEdit={onEdit} />
  ));

  return <Grid columns={6}>{renderTodo}</Grid>;
};

export default React.memo(Todos);

import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, selectTodo } from "../actions";
import { Grid, Card, Button } from "semantic-ui-react";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header as="h2">{todo.todo}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Button.Group size="tiny">
            <Button
              basic
              color="green"
              onClick={() => dispatch(selectTodo(todo.id))}
            >
              Edit
            </Button>
            <Button
              basic
              color="red"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              Delete
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default Todo;

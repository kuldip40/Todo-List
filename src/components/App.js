import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, clearSelectedTodo } from "../actions";
import Todos from "./Todos";

import { Header, Form, Container } from "semantic-ui-react";

const App = () => {
  const dispatch = useDispatch();
  const { selectedTodo } = useSelector((state) => state.todos);

  const [todo, setTodo] = useState("");
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    setCurrentTodo(selectedTodo);
  }, [selectedTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      return;
    }
    dispatch(addTodo(todo));
    setTodo("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTodo(currentTodo.id, currentTodo.todo));
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Header as="h1">TODO's List</Header>
      {Object.keys(currentTodo).length > 0 ? (
        <Form onSubmit={handleEditSubmit}>
          <Form.Group inline>
            <Form.Input
              placeholder="Enter Todo..."
              value={currentTodo.todo}
              onChange={(e) =>
                setCurrentTodo({ ...currentTodo, todo: e.target.value })
              }
              width={6}
            ></Form.Input>
            <Form.Button primary>Update</Form.Button>
            <Form.Button primary onClick={() => dispatch(clearSelectedTodo())}>
              Cancel
            </Form.Button>
          </Form.Group>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group inline>
            <Form.Input
              placeholder="Enter Todo..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              width={6}
            />
            <Form.Button primary>Add Todo</Form.Button>
          </Form.Group>
        </Form>
      )}
      <Todos />
    </Container>
  );
};

export default App;

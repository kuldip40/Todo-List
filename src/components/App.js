import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Header, Form, Container } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

import { addTodo, updateTodo } from "../actions";
import Todos from "./Todos";

const defaultValues = { todo: "", id: null };
const App = () => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues,
  });
  // console.log(errors);
  console.log("watch", watch());

  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, reset]);

  const onEdit = (currentTodo) => {
    // console.log(currentTodo);
    reset({ todo: currentTodo.todo, id: currentTodo.id });
    setIsEditable(true);
  };

  const onSubmit = ({ todo, id }) => {
    if (!getValues("id")) {
      dispatch(addTodo({ todo, id: uuidv4() }));
    } else {
      dispatch(updateTodo(id, todo));
      setIsEditable(false);
    }
    reset(defaultValues);
  };

  const handleCancelEdit = () => {
    reset(defaultValues);
    setIsEditable(false);
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Header as="h1">TODO's List</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Controller
            control={control}
            name="todo"
            render={({ field }) => (
              <Form.Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Enter Todo..."
                error={errors.todo && { content: errors.todo.message }}
                width={6}
              ></Form.Input>
            )}
            rules={{ required: "Must be Required" }}
          />
          <Form.Button primary>
            {isEditable ? "Update" : "Add Todo"}
          </Form.Button>
          {isEditable && (
            <Form.Button primary onClick={handleCancelEdit}>
              Cancel
            </Form.Button>
          )}
        </Form.Group>
      </Form>

      <Todos onEdit={onEdit} />
    </Container>
  );
};

export default App;

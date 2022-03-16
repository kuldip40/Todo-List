// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addTodo, updateTodo, clearSelectedTodo } from "../actions";
// import Todos from "./Todos";

// import { Header, Form, Container } from "semantic-ui-react";

// const App = () => {
//   const dispatch = useDispatch();
//   const { selectedTodo } = useSelector((state) => state.todos);

//   const [todo, setTodo] = useState("");
//   const [currentTodo, setCurrentTodo] = useState({});

//   useEffect(() => {
//     setCurrentTodo(selectedTodo);
//   }, [selectedTodo]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!todo) {
//       return;
//     }
//     dispatch(addTodo(todo));
//     setTodo("");
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateTodo(currentTodo.id, currentTodo.todo));
//   };

//   return (
//     <Container style={{ marginTop: "10px" }}>
//       <Header as="h1">TODO's List</Header>
//       {Object.keys(currentTodo).length > 0 ? (
//         <Form onSubmit={handleEditSubmit}>
//           <Form.Group inline>
//             <Form.Input
//               placeholder="Enter Todo..."
//               value={currentTodo.todo}
//               onChange={(e) =>
//                 setCurrentTodo({ ...currentTodo, todo: e.target.value })
//               }
//               width={6}
//             ></Form.Input>
//             <Form.Button primary>Update</Form.Button>
//             <Form.Button primary onClick={() => dispatch(clearSelectedTodo())}>
//               Cancel
//             </Form.Button>
//           </Form.Group>
//         </Form>
//       ) : (
//         <Form onSubmit={handleSubmit}>
//           <Form.Group inline>
//             <Form.Input
//               placeholder="Enter Todo..."
//               value={todo}
//               onChange={(e) => setTodo(e.target.value)}
//               width={6}
//             />
//             <Form.Button primary>Add Todo</Form.Button>
//           </Form.Group>
//         </Form>
//       )}
//       <Todos />
//     </Container>
//   );
// };

// export default App;

// 2.
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm, Controller } from "react-hook-form";
// import { addTodo, updateTodo, clearSelectedTodo } from "../actions";
// import Todos from "./Todos";

// import { Header, Form, Container } from "semantic-ui-react";

// const App = () => {
//   const {
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors, isSubmitSuccessful },
//   } = useForm({
//     defaultValues: { todo: "" },
//   });
//   console.log(errors);

//   const dispatch = useDispatch();
//   // const { selectedTodo } = useSelector((state) => state.todos);
//   // const [currentTodo, setCurrentTodo] = useState({});

//   // useEffect(() => {
//   //   setCurrentTodo(selectedTodo);
//   // }, [selectedTodo]);

//   useEffect(() => {
//     if (isSubmitSuccessful) {
//       reset({ todo: "" });
//     }
//   }, [isSubmitSuccessful, reset]);

//   const onSubmit = ({ todo }) => {
//     console.log(todo);
//     dispatch(addTodo(todo));
//   };

//   return (
//     <Container style={{ marginTop: "10px" }}>
//       <Header as="h1">TODO's List</Header>

//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <Form.Group>
//           <Controller
//             control={control}
//             name="todo"
//             render={({ field }) => (
//               <Form.Input
//                 value={field.value}
//                 onChange={field.onChange}
//                 onBlur={field.onBlur}
//                 placeholder="Enter Todo..."
//                 error={errors.todo && { content: errors.todo.message }}
//                 width={6}
//               ></Form.Input>
//             )}
//             rules={{ required: "Must be Required" }}
//           />
//           <Form.Button primary>Add Todo</Form.Button>
//         </Form.Group>
//       </Form>
//       <Todos />
//     </Container>
//   );
// };

// export default App;

// 3.
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { addTodo, updateTodo, clearSelectedTodo } from "../actions";
import Todos from "./Todos";

import { Header, Form, Container } from "semantic-ui-react";

const App = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: { todo: "", editTodo: { todo: "", id: null } },
  });
  // console.log(errors);
  console.log(watch("editTodo"));

  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ todo: "" });
    }
  }, [isSubmitSuccessful, reset]);

  const onEdit = (currentTodo) => {
    console.log(currentTodo);
    setValue("editTodo", { todo: currentTodo.todo, id: currentTodo.id });
    setIsEditable(true);
  };

  const onSubmit = ({ todo }) => {
    dispatch(addTodo(todo));
  };

  const onEditSubmit = ({ editTodo }) => {
    console.log(editTodo);
    dispatch(updateTodo(editTodo.id, editTodo.todo));
    setIsEditable(false);
  };

  const onEditCancel = () => {
    reset();
    setIsEditable(false);
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Header as="h1">TODO's List</Header>
      {isEditable ? (
        <Form onSubmit={handleSubmit(onEditSubmit)}>
          <Form.Group>
            <Controller
              control={control}
              name="editTodo"
              render={({ field }) => (
                <Form.Input
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Enter Todo..."
                  error={
                    errors.editTodo && { content: errors.editTodo.message }
                  }
                  width={6}
                ></Form.Input>
              )}
              rules={{ required: "Must be Required" }}
            />
            <Form.Button primary>Update</Form.Button>
            <Form.Button onClick={onEditCancel}>Cancel</Form.Button>
          </Form.Group>
        </Form>
      ) : (
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
            <Form.Button primary>Add Todo</Form.Button>
          </Form.Group>
        </Form>
      )}

      <Todos onEdit={onEdit} />
    </Container>
  );
};

export default App;

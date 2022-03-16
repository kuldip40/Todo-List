export const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};

export const updateTodo = (id, todo) => {
  console.log("action", id, todo);
  return {
    type: "UPDATE_TODO",
    payload: {
      id,
      todo: { id, todo },
    },
  };
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
};

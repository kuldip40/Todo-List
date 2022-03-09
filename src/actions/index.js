export const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: {
      id: new Date().toISOString(),
      todo,
    },
  };
};

export const selectTodo = (id) => {
  return {
    type: "SELECT_TODO",
    payload: id,
  };
};

export const clearSelectedTodo = ()=>{
  return{
    type:"CLEAR_SELECTED_TODO"
  }
}

export const updateTodo = (id, todo) => {
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

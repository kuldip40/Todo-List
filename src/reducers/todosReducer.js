const INITIAL_VALUE = {
  todos: [],
  selectedTodo: {},
};

const todosReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload.todo : todo
        ),
        selectedTodo: {},
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};
export default todosReducer;

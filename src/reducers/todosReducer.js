const INITIAL_VALUE = {
  todos: [],
  selectedTodo: {},
};

const todosReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "SELECT_TODO":
      return {
        ...state,
        selectedTodo: state.todos.find((todo) => todo.id === action.payload),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload.todo : todo
        ),
        selectedTodo: {},
      };
    case "CLEAR_SELECTED_TODO":
      return { ...state, selectedTodo: {} };
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

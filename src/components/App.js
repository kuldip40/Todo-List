import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, clearSelectedTodo } from "../actions";
import Todos from "./Todos";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todos);
  const { selectedTodo } = state;

  const [todo, setTodo] = useState("");
  const [currentTodo, setCurrentTodo] = useState(selectedTodo);

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
    <div>
      {Object.keys(currentTodo).length > 0 ? (
        <form onSubmit={handleEditSubmit}>
          <label htmlFor="todo"></label>
          <input
            type="text"
            id="todo"
            value={currentTodo.todo}
            onChange={(e) =>
              setCurrentTodo({ ...currentTodo, todo: e.target.value })
            }
          />
          <button>update</button>
          <button onClick={() => dispatch(clearSelectedTodo())}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="todo"></label>
          <input
            type="text"
            id="todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button>Add Todo</button>
        </form>
      )}

      <Todos />
    </div>
  );
};

export default App;

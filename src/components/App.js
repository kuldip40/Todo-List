import React, { useCallback, useState, useEffect } from "react";
import Todos from "./Todos";

const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todo, setTodo] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      return;
    }

    setTodos((oldTodos) => {
      return [...oldTodos, { id: new Date().toISOString(), todo }];
    });

    setTodo("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onEditTodo = useCallback((todo) => {
    setCurrentTodo(todo);
    setIsEditable(true);
  }, []);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTodos = todos.map((todo) =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setTodos(updatedTodos);
    setIsEditable(false);
  };

  const onDeleteTodo = useCallback((id) => {
    setTodos((oldTodos) => {
      return oldTodos.filter((todo) => todo.id !== id);
    });
  }, []);

  return (
    <div>
      {isEditable ? (
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
          <button onClick={() => setIsEditable(false)}>Cancel</button>
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

      <Todos
        todos={todos}
        onEditTodo={onEditTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </div>
  );
};

export default App;

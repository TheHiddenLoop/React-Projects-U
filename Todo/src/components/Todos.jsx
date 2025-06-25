import { useState, useRef } from "react";

export function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const titleRef = useRef(null);

  const handleSubmit = () => {
    if (!title.trim() || !task.trim()) {
      alert("Please enter both a title and a task.");
      return;
    }

    const newTodo = { title: title.trim(), task: task.trim() };
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setTitle("");
    setTask("");

    titleRef.current?.focus();
  };

  const deleteTodo = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const updateTodo = (index) => {
    const newTask = prompt("Enter new task:", todos[index].task);
    if (newTask !== null && newTask.trim()) {
      const updatedTodos = [...todos];
      updatedTodos[index].task = newTask.trim();
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="todo-container">
      <h2 className="todo-heading">My Todo List</h2>

      <input
        type="text"
        placeholder="Enter a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-input"
      />
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="todo-input"
      />
      <button onClick={handleSubmit} className="todo-button">
        Add Todo
      </button>

      {todos.length === 0 ? (
        <p className="todo-empty">No tasks added yet.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              <span className="todo-text">
                <strong>{todo.title}</strong>: {todo.task}
              </span>
              <div>
                <button
                  onClick={() => updateTodo(index)}
                  className="todo-action-btn"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTodo(index)}
                  className="todo-action-btn"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

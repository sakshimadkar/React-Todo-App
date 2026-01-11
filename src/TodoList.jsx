import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
    const [todos, setTodos] = useState([
        { task: "Sample-Task", id: uuidv4(), isDone: false },
    ]);
    const [newTodo, setNewTodo] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [editId, setEditId] = useState(null);      // Track task being edited
    const [editValue, setEditValue] = useState("");  // Temporary value for edit

    // Add new task
    const addNewTask = () => {
        if (newTodo.trim() === "") return;
        setTodos((prevTodos) => [
            ...prevTodos,
            { task: newTodo, id: uuidv4(), isDone: false },
        ]);
        setNewTodo("");
    };

    // Update input value
    const updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    // Delete task
    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    // Mark single task as done
    const markAsDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isDone: true } : todo
            )
        );
    };

    // Mark all tasks as done
    const markAllDone = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({ ...todo, isDone: true }))
        );
    };

    // Start editing a task
    const startEdit = (id, task) => {
        setEditId(id);
        setEditValue(task);
    };

    // Save edited task
    const saveEdit = (id) => {
        if (editValue.trim() === "") return;
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, task: editValue } : todo
            )
        );
        setEditId(null);
        setEditValue("");
    };

    return (
        <div className={`todo-container ${darkMode ? "dark" : ""}`}>
            {/* Dark Mode Toggle */}
            <button
                className="dark-toggle"
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? "Light Mode ☀" : "Dark Mode 🌙"}
            </button>

            <h4>Tasks Todo</h4>

            {/* Input */}
            <input
                placeholder="Add a new task..."
                value={newTodo}
                onChange={updateTodoValue}
            />

            {/* Add Button */}
            <button className="add-btn" onClick={addNewTask}>
                Add Task
            </button>

            {/* Todo List */}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {editId === todo.id ? (
                            <>
                                <input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button onClick={() => saveEdit(todo.id)}>Save</button>
                                <button onClick={() => setEditId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span
                                    className={`todo-text ${
                                        todo.isDone ? "done" : ""
                                    }`}
                                >
                                    {todo.task}
                                </span>

                                <div>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="done-btn"
                                        onClick={() => markAsDone(todo.id)}
                                    >
                                        Mark As Done
                                    </button>

                                    <button
                                        className="edit-btn"
                                        onClick={() => startEdit(todo.id, todo.task)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {/* Mark All Button */}
            <button className="mark-all" onClick={markAllDone}>
                Mark All As Done
            </button>
        </div>
    );
}

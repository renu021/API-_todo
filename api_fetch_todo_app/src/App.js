import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.trim() !== '') {
      if (editId) {
        const updatedTodos = todos.map((t) =>
          t.id === editId ? { id: editId, todo } : t
        );
        setTodos(updatedTodos);
        setEditId(0);
      } else {
        const newTodo = { id: `${todo}-${Date.now()}`, todo };
        setTodos([newTodo, ...todos]);
      }
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos(delTodo);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((t) => t.id === id);
    if (editTodo) {
      setTodo(editTodo.todo);
      setEditId(id);
    } else {
      console.error(`Todo with id ${id} not found.`);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>TO-DO List</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <button type="submit">{editId ? "Edit" : "Add"}</button>
        </form>

        <ul className="allTodos">
          {jsonData.map((item) => (
            <li className="singleTodo" key={`${item.id}-api`}>
              <span className="todoText">{item.title}</span>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}

          {todos.map((t) => (
            <li className="singleTodo" key={t.id}>
              <span className="todoText">{t.todo}</span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

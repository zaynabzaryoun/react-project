import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState({ id: 0, title: "", completed: false });
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: task.id + 1,
      title: task.title,
      completed: task.completed,
    };
    if (!isEditing) {
      setList([...list, newTask]);
      setTask({ id: newTask.id, title: "" });
    } else {
      setList(
        list.map((task) =>
          task.id === editId ? { ...task, title: newTask.title } : task
        )
      );
    }
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (id) => {
    const editedTask = list.find((task) => task.id === id);
    if (editedTask) {
      setTask({ id: editedTask.id, title: editedTask.title });
      setIsEditing(true);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    const filteredlist = list.filter((task) => task.id !== id);
    setList(filteredlist);
  };

  return (
    <div>
      <h1>hello</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={task.title}
          onChange={(e) => {
            setTask({
              ...task,
              title: e.target.value,
            });
          }}
        />
        <button type="submit">submit</button>
      </form>
      <ul>
        {list.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              onChange={() => console.log(task.completed)}
              checked={task.completed}
              style={{
                textDecoration: task.completed ? "line-throught" : "none",
              }}
            />
            {task.title}{" "}
            <button onClick={() => handleEdit(task.id)}>edit</button>
            <button onClick={() => handleDelete(task.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

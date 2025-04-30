import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState({ id: 0, title: "", completed: false, dueDate: "", description: "" });
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [select, setSelect] = useState("all")

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: task.id + 1,
      title: task.title,
      completed: false,
      dueDate: task.dueDate,
      description: task.description
    };
    if (!isEditing) {
      setList([...list, newTask]);
      setTask({ id: newTask.id, title: "", dueDate: "", description: "" });
    } else {
      setList(
        list.map((task) =>
          task.id === editId ? { ...task, title: newTask.title, dueDate: newTask.dueDate, description: newTask.description } : task
        )
      );
      setTask({ id: newTask.id, title: "", dueDate: "", description: "" });
    }
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (id) => {
    const editedTask = list.find((task) => task.id === id);
    if (editedTask) {
      setTask({ id: editedTask.id, title: editedTask.title, dueDate: editedTask.dueDate, description: editedTask.description });
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
      <select name="select" id="select">
        <option value="all">all task</option>
        <option value="completed">completed</option>
        <option value="uncompleted">uncompleted</option>
      </select>
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
        <input type="date" value={task.dueDate} onChange={e => setTask({...task, dueDate: e.target.value})
        } />
        <textarea name="description" value={task.description}  onChange={e => setTask({...task, description: e.target.value})} placeholder="description..."></textarea>
        <button type="submit">submit</button>
      </form>
      <button></button>
      <ul>
        {list.map((task) => (
          <li key={task.id}  style={{
            textDecoration: task.completed ? "line-through" : "none",
          }}>
            <input
              type="checkbox"
              onChange={() => {
                setList(list.map(t => task.id === t.id ? {...t, completed: !t.completed} : t))
              }}
              checked={task.completed}
            />
            {task.title}{" "} due date: {task.dueDate}
            <p>{task.description}</p>
            <button onClick={() => handleEdit(task.id)}>edit</button>
            <button onClick={() => handleDelete(task.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState({ id: 0, title: "", completed: false, dueDate: "", description: "", priority: "low" });
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [select, setSelect] = useState("all")

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: task.title,
      completed: false,
      dueDate: task.dueDate,
      description: task.description,
      priority: task.priority,
    };
    if (!isEditing) {
      setList([...list, newTask]);
      setTask({ id: newTask.id, title: "", dueDate: "", description: "", priority: "low" });
    } else {
      setList(
        list.map((task) =>
          task.id === editId ? { ...task, title: newTask.title, dueDate: newTask.dueDate, description: newTask.description, priority: task.priority } : task
        )
      );
      setTask({ id: newTask.id, title: "", dueDate: "", description: "", priority: "low" });
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

  let selectedList;
  if (select === "all") {
     selectedList = [...list]
  } else if (select === "completed") {
     selectedList = list.filter(task => task.completed === true)
  } else if (select === "uncompleted") {
     selectedList = list.filter(task => task.completed === false)
  }
  
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-20 bg-dark-purple">
      <h1 className="text-white">Todo List</h1>
      <section className="flex item-center gap-20">
        <label htmlFor="select" className="text-white">Filter the List</label>
        <select className="text-white" name="select" id="select" value={select} onChange={e => setSelect(e.target.value)}>
          <option value="all" className="text-white">All Task</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </section>
      <form onSubmit={handleSubmit}>
        <input
          value={task.title}
          onChange={(e) => {
            setTask({
              ...task,
              title: e.target.value,
            });
          }}
          placeholder = "Title"
        />
        <input type="date" value={task.dueDate} onChange={e => setTask({...task, dueDate: e.target.value})
        } />
        <textarea className="text-white" name="description" value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} placeholder="Description..."></textarea>
       
        <div className="radio">
          <input type="radio" value="low" name="priority" id="priority-low" checked={task.priority === "low"} onChange={e => setTask({...task, priority: e.target.value})} />
          <label htmlFor="priority-low" className="text-white">Low</label>

          <input type="radio" value="medium" name="priority" id="priority-medium" checked={task.priority === "medium"} onChange={e => setTask({...task, priority: e.target.value})} />
          <label htmlFor="priority-medium" className="text-white">Medium</label>

          <input type="radio" value="high" name="priority" id="priority-high" checked={task.priority === "high"} onChange={e => setTask({...task, priority: e.target.value})} />
          <label htmlFor="priority-high" className="text-white">High</label>
        </div>

        <button type="submit" className="bg-white p-2 rounded">Submit</button>
      </form>
      <ul>
        
        {selectedList.map((task) => (
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
            {task.title}{" "} prority: {task.priority} due date: {task.dueDate}
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

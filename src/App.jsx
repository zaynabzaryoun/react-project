import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState({
    id: 0,
    title: "",
    completed: false,
    dueDate: "",
    description: "",
    priority: "low",
  });
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [select, setSelect] = useState("all");

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
      setTask({
        id: newTask.id,
        title: "",
        dueDate: "",
        description: "",
        priority: "low",
      });
    } else {
      setList(
        list.map((task) =>
          task.id === editId
            ? {
                ...task,
                title: newTask.title,
                dueDate: newTask.dueDate,
                description: newTask.description,
                priority: task.priority,
              }
            : task
        )
      );
      setTask({
        id: newTask.id,
        title: "",
        dueDate: "",
        description: "",
        priority: "low",
      });
    }
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (id) => {
    const editedTask = list.find((task) => task.id === id);
    if (editedTask) {
      setTask({
        id: editedTask.id,
        title: editedTask.title,
        dueDate: editedTask.dueDate,
        description: editedTask.description,
      });
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
    selectedList = [...list];
  } else if (select === "completed") {
    selectedList = list.filter((task) => task.completed === true);
  } else if (select === "uncompleted") {
    selectedList = list.filter((task) => task.completed === false);
  }

  return (
    <section className="min-h-screen flex items-center flex-col gap-10 pt-20 bg-medium-blue">
      <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">
        Todo List
      </h1>
      <section className="flex item-center gap-10">
        <label htmlFor="select" className="text-white">
          Filter the List
        </label>
        <select
          className="text-white border rounded"
          name="select"
          id="select"
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value="all" className="text-white bg-dark">
            All Task
          </option>
          <option value="completed" className="text-white bg-dark">
            Completed
          </option>
          <option value="uncompleted" className="text-white bg-dark">
            Uncompleted
          </option>
        </select>
      </section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-9/12 md:w-4/12 "
      >
        <input
          className="w-full sm:w-72 text-white bg-dark rounded py-2 px-1"
          value={task.title}
          onChange={(e) => {
            setTask({
              ...task,
              title: e.target.value,
            });
          }}
          placeholder="Title"
        />
        <div className="flex gap-5 flex-col">
          <label htmlFor="due-date" className="text-white mt-3">
            Due Date:
          </label>
          <input
            id="due-date"
            className="text-white bg-dark rounded py-2 px-1"
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
          <label htmlFor="radio" className="text-white mt-3">
            Priority:
          </label>
          <div id="radio">
            <input
              className="m-4"
              type="radio"
              value="low"
              name="priority"
              id="priority-low"
              checked={task.priority === "low"}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            />
            <label htmlFor="priority-low" className="text-white">
              Low
            </label>

            <input
              className="m-4"
              type="radio"
              value="medium"
              name="priority"
              id="priority-medium"
              checked={task.priority === "medium"}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            />
            <label htmlFor="priority-medium" className="text-white">
              Medium
            </label>

            <input
              className="m-4"
              type="radio"
              value="high"
              name="priority"
              id="priority-high"
              checked={task.priority === "high"}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            />
            <label htmlFor="priority-high" className="text-white">
              High
            </label>
          </div>
        </div>
        <textarea
          className="text-white bg-dark rounded py-2 px-1"
          name="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Description..."
        ></textarea>

        <button type="submit" className="font-medium bg-light-blue p-2 rounded">
          Submit
        </button>
      </form>
      <ul className="w-9/12 md:w-4/12 mb-4">
        {selectedList.map((task) => (
          <li className="rounded p-2 mb-4 bg-light" key={task.id}>
            <div className="flex justify-between">
              <span>
                <input
                  type="checkbox"
                  onChange={() => {
                    setList(
                      list.map((t) =>
                        task.id === t.id ? { ...t, completed: !t.completed } : t
                      )
                    );
                  }}
                  checked={task.completed}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                  className="text-2xl ml-2 font-semibold"
                >
                  {task.title}
                </span>
              </span>
              <span>
                <button
                  className="font-medium bg-light-blue px-2 py-1 mr-2 rounded"
                  onClick={() => handleEdit(task.id)}
                >
                  Edit
                </button>
                <button
                  className="font-medium bg-light-blue px-2 py-1 rounded"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </span>
            </div>

            <p className="text-dark mt-4">Prority: {task.priority}</p>
            <p className="text-dark mb-4">Due Date: {task.dueDate}</p>
            <p className="mb-4">{task.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;

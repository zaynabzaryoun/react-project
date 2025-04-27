import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [value, setValue] = useState({ id: 0, title: "" });
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { id: value.id + 1, title: value.title };
    if (!isEditing) {
      setList([...list, newTask]);
      setValue({ id: newTask.id, title: "" });
    } else {
      setList(
        list.map((task) =>
          task.id === editId ? { ...task, title: value.title } : task
        )
      );
    }
    setIsEditing(false);
    setEditId(null);
  };

  // useEffect(() => {
  //   console.log("value:", value);
  //   console.log("list", list);
  // }, [list, value]);

  const handleEdit = (id) => {
    const editedTask = list.find((task) => task.id === id);
    if (editedTask) {
      setValue({ id: editedTask.id, title: editedTask.title });
      setIsEditing(true);
      setEditId(id);
    }
    // console.log(id);
    // console.log(newTitle);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div>
      <h1>hello</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={value.title}
          onChange={(e) => {
            setValue({
              ...value,
              title: e.target.value,
            });
          }}
        />
        <button type="submit">submit</button>
      </form>
      <ul>
        {list.map((task) => (
          <li key={task.id}>
            {task.title}{" "}
            <button onClick={() => handleEdit(task.id)}>edit</button>
            <button onClick={handleDelete}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

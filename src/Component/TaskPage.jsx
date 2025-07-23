import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TaskPage.css";

const TaskPage = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    priority: "Low",
  });
  const [editIndex, setEditIndex] = useState(null);

  // 🔽 Load user-specific tasks from localStorage
  useEffect(() => {
    const userTasks = JSON.parse(localStorage.getItem(`tasks-${email}`)) || [];
    setTasks(userTasks);
  }, [email]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const saveTasksToStorage = (updated) => {
    setTasks(updated);
    localStorage.setItem(`tasks-${email}`, JSON.stringify(updated));
  };

  const handleSubmit = () => {
    if (!taskData.title.trim()) return;

    let updated;
    if (editIndex !== null) {
      updated = [...tasks];
      updated[editIndex] = taskData;
      setEditIndex(null);
    } else {
      updated = [...tasks, taskData];
    }

    saveTasksToStorage(updated);
    resetForm();
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    saveTasksToStorage(updated);
    resetForm();
  };

  const handleEdit = (index) => {
    setTaskData(tasks[index]);
    setEditIndex(index);
  };

  const resetForm = () => {
    setTaskData({
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
      priority: "Low",
    });
    setEditIndex(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="task-container">
      <h2>Welcome, {email || "User"}!</h2>

      <h3>{editIndex !== null ? "Edit Task" : "Add a Task"}</h3>
      <div className="task-form">
        <input
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
        />
        <select name="status" value={taskData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" value={taskData.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={handleSubmit}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>

        {editIndex !== null && (
          <button onClick={resetForm} className="cancel-edit-btn">
            Cancel Edit
          </button>
        )}
      </div>

      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task, i) => (
            <li key={i}>
              <strong>{task.title}</strong> ({task.priority})
              <br />
              {task.description}
              <br />
              Due: {task.dueDate} | Status: {task.status}
              <br />
              <button onClick={() => handleEdit(i)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(i)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default TaskPage;
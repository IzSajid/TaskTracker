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
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Title"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button onClick={handleSubmit} className="submit-btn">
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
          {editIndex !== null && (
            <button onClick={resetForm} className="cancel-edit-btn">
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task, i) => (
            <li key={i} className="task-item">
              <div className="task-header">
                <strong>{task.title}</strong>
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>
              <div className="task-desc">{task.description}</div>
              <div className="task-meta">
                <span className="due-date">Due: {task.dueDate || "N/A"}</span>
                <span className={`status-badge ${task.status.toLowerCase()}`}>
                  {task.status}
                </span>
              </div>
              <div className="task-actions">
                <button onClick={() => handleEdit(i)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(i)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskPage;
import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  const [error, setError] = useState(""); // To display error message

  const checkTag = (tag) => taskData.tags.includes(tag);

  const selectTag = (tag) => {
    setTaskData((prev) => ({
      ...prev,
      tags: checkTag(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for empty task
    if (!taskData.task.trim()) {
      setError("Task cannot be empty!");
      return;
    }

    // If valid, add task and reset state
    setTasks((prev) => [...prev, taskData]);
    setTaskData({ task: "", status: "todo", tags: [] });
    setError(""); // Clear any previous errors
  };

  const tags = ["Monday", "Tuesday", "wednesday", "thursday"];

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Enter your task"
          onChange={handleChange}
        />
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <div className="task_form_bottom_line">
          <div>
            {tags.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`tag_button ${
                  checkTag(tag) ? "selected" : ""
                }`}
                onClick={() => selectTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <select
            name="status"
            value={taskData.status}
            className="task_status"
            onChange={handleChange}
          >
            <option value="todo">To do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <button type="submit" className="task_submit">
            + Add Task
          </button>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;



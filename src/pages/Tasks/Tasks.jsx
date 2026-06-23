import { useState, useEffect } from "react";
import "./Tasks.css";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/taskService";

import { supabase }
from "../../services/supabase";

function Tasks() {

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      due_date: "",

      priority: "Medium",

      status: "Pending",

      progress: 0,

    });

  const loadTasks =
    async () => {

      setLoading(true);

      const {
        data,
        error,
      } =
        await getTasks();

      if (!error) {

        setTasks(
          data || []
        );

      }

      setLoading(false);

    };

 useEffect(() => {
  const loadData = async () => {
    await loadTasks();
  };

  loadData();
}, []);

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  const resetForm =
    () => {

      setEditingId(null);

      setFormData({

        title: "",

        description: "",

        due_date: "",

        priority: "Medium",

        status: "Pending",

        progress: 0,

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const {
        data: { user },
      } =
        await supabase
          .auth
          .getUser();

      if (!user) {

        alert(
          "Please Login"
        );

        return;

      }

      const payload = {

        ...formData,

        user_id:
          user.id,

      };

      let result;

      if (editingId) {

        result =
          await updateTask(
            editingId,
            payload
          );

      } else {

        result =
          await createTask(
            payload
          );

      }

      if (result.error) {

        alert(
          result.error
            .message
        );

        return;

      }

      resetForm();

      loadTasks();

    };

  const handleEdit =
    (task) => {

      setEditingId(
        task.id
      );

      setFormData({

        title:
          task.title,

        description:
          task.description,

        due_date:
          task.due_date,

        priority:
          task.priority,

        status:
          task.status,

        progress:
          task.progress,

      });

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Task?"
        );

      if (
        !confirmDelete
      )
        return;

      const {
        error,
      } =
        await deleteTask(id);

      if (error) {

        alert(
          error.message
        );

        return;

      }

      loadTasks();

    };

  const filteredTasks =
    tasks.filter(
      (task) =>

        task.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        task.description
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  const totalTasks =
    tasks.length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Pending"
    ).length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const urgentTasks =
    tasks.filter(
      (task) =>
        task.priority ===
        "Urgent"
    ).length;

  if (loading) {

    return (
      <div className="tasks-page">
        <h2>
          Loading Tasks...
        </h2>
      </div>
    );

  }

  return (

    <div className="tasks-page">

      <div className="page-header">

        <h1>
          Task Manager
        </h1>

        <p>
          Manage startup tasks and deadlines.
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total</h3>
          <h2>{totalTasks}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <h2>{pendingTasks}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <h2>{completedTasks}</h2>
        </div>

        <div className="stat-card">
          <h3>Urgent</h3>
          <h2>{urgentTasks}</h2>
        </div>

      </div>

      <div className="task-form-card">

        <h2>

          {editingId
            ? "Update Task"
            : "Create Task"}

        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="form-grid">

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >

              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>

            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >

              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Cancelled</option>

            </select>

            <div className="progress-section">

  <div className="progress-header">

    <span>
      Task Progress
    </span>

    <strong>
      {formData.progress}%
    </strong>

  </div>

  <input
    type="range"
    name="progress"
    min="0"
    max="100"
    step="1"
    value={formData.progress}
    onChange={handleChange}
    className="custom-slider"
  />

</div>

          </div>

          <textarea
            rows="5"
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="save-btn"
          >

            {editingId
              ? "Update Task"
              : "Create Task"}

          </button>

        </form>

      </div>

      <div className="search-card">

        <input
          type="text"
          placeholder="Search Tasks..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="search-input"
        />

      </div>

      <div className="table-card">

        <table className="task-table">

          <thead>

            <tr>

              <th>Title</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredTasks.map(
              (task) => (

                <tr
                  key={task.id}
                >

                  <td>
                    {task.title}
                  </td>

                  <td>
                    {task.due_date}
                  </td>

                  <td>
                    {task.priority}
                  </td>

                  <td>
                    {task.status}
                  </td>

                  <td>
                    {task.progress}%
                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(
                          task
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          task.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Tasks;
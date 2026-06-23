import { useState, useEffect } from "react";
import "./FollowUps.css";

import {
  getFollowUps,
  createFollowUp,
  updateFollowUp,
  deleteFollowUp,
} from "../../services/followupService";

import {
  getInvestors,
} from "../../services/investorService";

import { supabase }
from "../../services/supabase";

function FollowUps() {

  const [followUps, setFollowUps] =
    useState([]);

  const [investors, setInvestors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      investor_id: "",

      title: "",

      due_date: "",

      priority: "Medium",

      status: "Pending",

      followup_type: "Call",

      outcome: "",

      notes: "",

    });

  const loadData =
    async () => {

      setLoading(true);

      const [
        followupsResult,
        investorsResult,
      ] = await Promise.all([

        getFollowUps(),

        getInvestors(),

      ]);

      setFollowUps(
        followupsResult.data || []
      );

      setInvestors(
        investorsResult.data || []
      );

      setLoading(false);

    };


    
useEffect(() => {

  const fetchData = async () => {
    await loadData();
  };

  fetchData();

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

        investor_id: "",

        title: "",

        due_date: "",

        priority: "Medium",

        status: "Pending",

        followup_type: "Call",

        outcome: "",

        notes: "",

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
          await updateFollowUp(
            editingId,
            payload
          );

      } else {

        result =
          await createFollowUp(
            payload
          );

      }

      if (result.error) {

        alert(
          result.error.message
        );

        return;

      }

      resetForm();

      loadData();

    };

  const handleEdit =
    (followup) => {

      setEditingId(
        followup.id
      );

      setFormData({

        investor_id:
          followup.investor_id,

        title:
          followup.title,

        due_date:
          followup.due_date,

        priority:
          followup.priority,

        status:
          followup.status,

        followup_type:
          followup.followup_type,

        outcome:
          followup.outcome,

        notes:
          followup.notes,

      });

    };

  const handleDelete =
    async (id) => {

      const ok =
        window.confirm(
          "Delete Follow Up?"
        );

      if (!ok)
        return;

      const {
        error,
      } =
        await deleteFollowUp(
          id
        );

      if (error) {

        alert(
          error.message
        );

        return;

      }

      loadData();

    };

  const filteredFollowUps =
    followUps.filter(
      (item) =>

        item.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.notes
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  const totalFollowUps =
    followUps.length;

  const pendingFollowUps =
    followUps.filter(
      item =>
        item.status ===
        "Pending"
    ).length;

  const completedFollowUps =
    followUps.filter(
      item =>
        item.status ===
        "Completed"
    ).length;

  const urgentFollowUps =
    followUps.filter(
      item =>
        item.priority ===
        "Urgent"
    ).length;

  if (loading) {

    return (

      <div className="followups-page">

        <h2>
          Loading Follow Ups...
        </h2>

      </div>

    );

  }

  return (

    <div className="followups-page">

      <div className="page-header">

        <h1>
          Follow Ups
        </h1>

        <p>
          Track investor follow-ups
          and communication.
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total</h3>
          <h2>
            {totalFollowUps}
          </h2>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <h2>
            {pendingFollowUps}
          </h2>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <h2>
            {completedFollowUps}
          </h2>
        </div>

        <div className="stat-card">
          <h3>Urgent</h3>
          <h2>
            {urgentFollowUps}
          </h2>
        </div>

      </div>

      <div className="followup-form-card">

        <h2>

          {editingId
            ? "Update Follow Up"
            : "Create Follow Up"}

        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="form-grid">

            <select
              name="investor_id"
              value={
                formData.investor_id
              }
              onChange={
                handleChange
              }
              required
            >

              <option value="">
                Select Investor
              </option>

              {investors.map(
                investor => (

                  <option
                    key={
                      investor.id
                    }
                    value={
                      investor.id
                    }
                  >

                    {investor.name}

                  </option>

                )
              )}

            </select>

            <input
              type="text"
              name="title"
              placeholder="Follow Up Title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              required
            />

            <input
              type="date"
              name="due_date"
              value={
                formData.due_date
              }
              onChange={
                handleChange
              }
              required
            />

            <select
              name="priority"
              value={
                formData.priority
              }
              onChange={
                handleChange
              }
            >

              <option>
                Low
              </option>

              <option>
                Medium
              </option>

              <option>
                High
              </option>

              <option>
                Urgent
              </option>

            </select>

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
            >

              <option>
                Pending
              </option>

              <option>
                Completed
              </option>

              <option>
                Missed
              </option>

              <option>
                Cancelled
              </option>

            </select>

            <select
              name="followup_type"
              value={
                formData.followup_type
              }
              onChange={
                handleChange
              }
            >

              <option>
                Call
              </option>

              <option>
                Email
              </option>

              <option>
                Meeting
              </option>

              <option>
                WhatsApp
              </option>

              <option>
                Proposal
              </option>

            </select>

            <input
              type="text"
              name="outcome"
              placeholder="Outcome"
              value={
                formData.outcome
              }
              onChange={
                handleChange
              }
            />

          </div>

          <textarea
            rows="5"
            name="notes"
            placeholder="Notes"
            value={
              formData.notes
            }
            onChange={
              handleChange
            }
          />

          <button
            type="submit"
            className="save-btn"
          >

            {editingId
              ? "Update Follow Up"
              : "Create Follow Up"}

          </button>

        </form>

      </div>

      <div className="search-card">

        <input
          type="text"
          placeholder="Search Follow Ups..."
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

        <table className="followup-table">

          <thead>

            <tr>

              <th>Title</th>
              <th>Due Date</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Outcome</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredFollowUps.map(
              (item) => (

                <tr
                  key={item.id}
                >

                  <td>
                    {item.title}
                  </td>

                  <td>
                    {item.due_date}
                  </td>

                  <td>
                    {item.followup_type}
                  </td>

                  <td>
                    {item.priority}
                  </td>

                  <td>
                    {item.status}
                  </td>

                  <td>
                    {item.outcome}
                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(
                          item
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          item.id
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

export default FollowUps;
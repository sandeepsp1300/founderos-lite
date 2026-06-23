import { useState, useEffect } from "react";
import "./Meetings.css";

import {
  getMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "../../services/meetingService";

import { getInvestors }
from "../../services/investorService";

import { supabase }
from "../../services/supabase";

function Meetings() {

  const [loading, setLoading] =
    useState(true);

  const [meetings, setMeetings] =
    useState([]);

  const [investors, setInvestors] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      investor_id: "",

      title: "",

      meeting_date: "",

      meeting_time: "",

      meeting_type:
        "Investor Pitch",

      priority:
        "Medium",

      status:
        "Upcoming",

      meeting_result: "",

      next_action: "",

      next_followup_date: "",

      notes: "",

    });

  const loadData =
    async () => {

      setLoading(true);

      const [
        meetingsResult,
        investorsResult,
      ] = await Promise.all([

        getMeetings(),

        getInvestors(),

      ]);

      setMeetings(
        meetingsResult.data || []
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

        meeting_date: "",

        meeting_time: "",

        meeting_type:
          "Investor Pitch",

        priority:
          "Medium",

        status:
          "Upcoming",

        meeting_result: "",

        next_action: "",

        next_followup_date: "",

        notes: "",

      });

    };
  const handleSaveMeeting =
    async (e) => {

      e.preventDefault();

      try {

        const {
          data: { user },
        } =
          await supabase
            .auth
            .getUser();

        if (!user) {

          alert(
            "Please login first"
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
            await updateMeeting(
              editingId,
              payload
            );

        } else {

          result =
            await createMeeting(
              payload
            );

        }

        if (
          result.error
        ) {

          alert(
            result.error
              .message
          );

          return;

        }

        alert(
          editingId
            ? "Meeting Updated"
            : "Meeting Created"
        );

        resetForm();

        loadData();

      } catch (error) {

        console.error(
          error
        );

      }

    };

  const handleEdit =
    (meeting) => {

      setEditingId(
        meeting.id
      );

      setFormData({

        investor_id:
          meeting.investor_id || "",

        title:
          meeting.title || "",

        meeting_date:
          meeting.meeting_date || "",

        meeting_time:
          meeting.meeting_time || "",

        meeting_type:
          meeting.meeting_type || "Investor Pitch",

        priority:
          meeting.priority || "Medium",

        status:
          meeting.status || "Upcoming",

        meeting_result:
          meeting.meeting_result || "",

        next_action:
          meeting.next_action || "",

        next_followup_date:
          meeting.next_followup_date || "",

        notes:
          meeting.notes || "",

      });

    };

  const handleDelete =
    async (id) => {

      const ok =
        window.confirm(
          "Delete this meeting?"
        );

      if (!ok)
        return;

      const {
        error,
      } =
        await deleteMeeting(
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

  const filteredMeetings =
    meetings.filter(
      (meeting) =>

        meeting.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        meeting.notes
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  const totalMeetings =
    meetings.length;

  const upcomingMeetings =
    meetings.filter(
      (item) =>
        item.status ===
        "Upcoming"
    ).length;

  const completedMeetings =
    meetings.filter(
      (item) =>
        item.status ===
        "Completed"
    ).length;

  const cancelledMeetings =
    meetings.filter(
      (item) =>
        item.status ===
        "Cancelled"
    ).length;

  if (loading) {

    return (

      <div className="meetings-page">

        <h2>
          Loading Meetings...
        </h2>

      </div>

    );

  }

  return (

    <div className="meetings-page">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <h1>
            Meetings CRM
          </h1>

          <p>
            Manage investor meetings,
            follow-ups and outcomes.
          </p>

        </div>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">

          <h3>
            Total Meetings
          </h3>

          <h2>
            {totalMeetings}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Upcoming
          </h3>

          <h2>
            {upcomingMeetings}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Completed
          </h3>

          <h2>
            {completedMeetings}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Cancelled
          </h3>

          <h2>
            {cancelledMeetings}
          </h2>

        </div>

      </div>

      {/* FORM */}

      <div className="meeting-form-card">

        <h2>

          {editingId
            ? "Update Meeting"
            : "Create Meeting"}

        </h2>

        <form
          onSubmit={
            handleSaveMeeting
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
                (investor) => (

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
              placeholder="Meeting Title"
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
              name="meeting_date"
              value={
                formData.meeting_date
              }
              onChange={
                handleChange
              }
              required
            />

            <input
              type="time"
              name="meeting_time"
              value={
                formData.meeting_time
              }
              onChange={
                handleChange
              }
            />

            <select
              name="meeting_type"
              value={
                formData.meeting_type
              }
              onChange={
                handleChange
              }
            >

              <option>
                Investor Pitch
              </option>

              <option>
                Follow Up
              </option>

              <option>
                Due Diligence
              </option>

              <option>
                Partnership
              </option>

            </select>

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
                Upcoming
              </option>

              <option>
                Completed
              </option>

              <option>
                Cancelled
              </option>

            </select>

            <input
              type="text"
              name="meeting_result"
              placeholder="Meeting Result"
              value={
                formData.meeting_result
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="next_action"
              placeholder="Next Action"
              value={
                formData.next_action
              }
              onChange={
                handleChange
              }
            />

            <input
              type="date"
              name="next_followup_date"
              value={
                formData.next_followup_date
              }
              onChange={
                handleChange
              }
            />

          </div>

          <textarea
            rows="5"
            name="notes"
            placeholder="Meeting Notes"
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
              ? "Update Meeting"
              : "Create Meeting"}

          </button>

        </form>

      </div>
            {/* SEARCH */}

      <div className="search-card">

        <input
          type="text"
          placeholder="Search meetings..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="search-input"
        />

      </div>

      {/* TABLE */}

      <div className="table-card">

        <h2>
          Meeting Records
        </h2>

        <table className="meeting-table">

          <thead>

            <tr>

              <th>
                Title
              </th>

              <th>
                Date
              </th>

              <th>
                Type
              </th>

              <th>
                Priority
              </th>

              <th>
                Status
              </th>

              <th>
                Result
              </th>

              <th>
                Follow Up
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredMeetings
              .length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                >

                  No Meetings Found

                </td>

              </tr>

            ) : (

              filteredMeetings.map(
                (
                  meeting
                ) => (

                  <tr
                    key={
                      meeting.id
                    }
                  >

                    <td>
                      {meeting.title}
                    </td>

                    <td>
                      {
                        meeting.meeting_date
                      }
                    </td>

                    <td>
                      {
                        meeting.meeting_type
                      }
                    </td>

                    <td>
                      {
                        meeting.priority
                      }
                    </td>

                    <td>
                      {
                        meeting.status
                      }
                    </td>

                    <td>
                      {
                        meeting.meeting_result
                      }
                    </td>

                    <td>
                      {
                        meeting.next_followup_date
                      }
                    </td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(
                            meeting
                          )
                        }
                      >

                        Edit

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            meeting.id
                          )
                        }
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Meetings;
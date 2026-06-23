import { useState, useEffect } from "react";
import "./Calendar.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { supabase } from "../../services/supabase";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getCRMCalendar,
  getCalendarStats,
} from "../../services/calendarService";

function Calendar() {

  const [loading, setLoading] =
    useState(true);

  /* ==========================
     CRUD EVENTS
  ========================== */

  const [events, setEvents] =
    useState([]);

  /* ==========================
     FULL CALENDAR DATA
  ========================== */

  const [calendarData,
    setCalendarData] =
    useState([]);

  /* ==========================
     SEARCH
  ========================== */

  const [search, setSearch] =
    useState("");

  /* ==========================
     EDIT MODE
  ========================== */

  const [editingId,
    setEditingId] =
    useState(null);

  /* ==========================
     STATS
  ========================== */

  const [stats, setStats] =
    useState({

      totalEvents: 0,

      meetings: 0,

      tasks: 0,

      followups: 0,

      billing: 0,

      calendarEvents: 0,

    });

  /* ==========================
     FORM
  ========================== */

  const [formData,
    setFormData] =
    useState({

      title: "",

      event_type:
        "Meeting",

      start_date: "",

      end_date: "",

      location: "",

      priority:
        "Medium",

      status:
        "Scheduled",

      description: "",

    });

  /* ==========================
     LOAD DATA
  ========================== */

  const loadData =
    async () => {

      try {

        setLoading(true);

        const eventsResult =
          await getEvents();

        const calendarResult =
          await getCRMCalendar();

        const statsResult =
          await getCalendarStats();

        setEvents(
          eventsResult.data || []
        );

        setCalendarData(
          calendarResult.data || []
        );

        setStats(
          statsResult
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);


  /* ==========================
     HANDLE INPUT
  ========================== */

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  /* ==========================
     RESET FORM
  ========================== */

  const resetForm =
    () => {

      setEditingId(null);

      setFormData({

        title: "",

        event_type:
          "Meeting",

        start_date: "",

        end_date: "",

        location: "",

        priority:
          "Medium",

        status:
          "Scheduled",

        description: "",

      });

    };
      /* ==========================
     CREATE / UPDATE EVENT
  ========================== */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const {
          data: { user },
        } =
          await supabase.auth.getUser();

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
            await updateEvent(
              editingId,
              payload
            );

        } else {

          result =
            await createEvent(
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

      } catch (error) {

        console.error(
          error
        );

      }

    };

  /* ==========================
     EDIT EVENT
  ========================== */

  const handleEdit =
    (event) => {

      setEditingId(
        event.id
      );

      setFormData({

        title:
          event.title || "",

        event_type:
          event.event_type || "Meeting",

        start_date:
          event.start_date
            ? event.start_date.slice(
                0,
                16
              )
            : "",

        end_date:
          event.end_date
            ? event.end_date.slice(
                0,
                16
              )
            : "",

        location:
          event.location || "",

        priority:
          event.priority || "Medium",

        status:
          event.status || "Scheduled",

        description:
          event.description || "",

      });

      window.scrollTo({

        top: 0,

        behavior:
          "smooth",

      });

    };

  /* ==========================
     DELETE EVENT
  ========================== */

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete this event?"
        );

      if (!confirmed)
        return;

      const { error } =
        await deleteEvent(
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

  /* ==========================
     SEARCH
  ========================== */

  const filteredEvents =
    events.filter(
      (event) =>

        event.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        event.event_type
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        event.location
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  /* ==========================
     FULL CALENDAR EVENTS
  ========================== */

  const fullCalendarEvents =
    calendarData.map(
      (item) => ({

        id:
          `${item.source}-${item.id}`,

        title:
          `[${item.source}] ${item.title}`,

        start:
          new Date(
            item.event_date
          ),

        end:
          new Date(
            item.event_date
          ),

        backgroundColor:

          item.source ===
          "Meeting"

            ? "#2563eb"

          : item.source ===
            "Task"

            ? "#16a34a"

          : item.source ===
            "FollowUp"

            ? "#f97316"

          : item.source ===
            "Billing"

            ? "#dc2626"

          : "#7c3aed",

      })

    );

  /* ==========================
     LOADING
  ========================== */

  if (loading) {

    return (

      <div
        className="calendar-page"
      >

        <h2>
          Loading Calendar...
        </h2>

      </div>

    );

  }

    return (

    <div className="calendar-page">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="page-header">

        <h1>
          CRM Calendar
        </h1>

        <p>
          Manage Events, Meetings,
          Tasks, FollowUps & Billing
          in one place.
        </p>

      </div>

      {/* ==========================
          STATS
      ========================== */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total</h3>
          <h2>{stats.totalEvents}</h2>
        </div>

        <div className="stat-card">
          <h3>Meetings</h3>
          <h2>{stats.meetings}</h2>
        </div>

        <div className="stat-card">
          <h3>Tasks</h3>
          <h2>{stats.tasks}</h2>
        </div>

        <div className="stat-card">
          <h3>FollowUps</h3>
          <h2>{stats.followups}</h2>
        </div>

        <div className="stat-card">
          <h3>Billing</h3>
          <h2>{stats.billing}</h2>
        </div>

        <div className="stat-card">
          <h3>Events</h3>
          <h2>{stats.calendarEvents}</h2>
        </div>

      </div>

      {/* ==========================
          FULL CALENDAR
      ========================== */}

      <div className="calendar-view-card">

        <FullCalendar

          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}

          initialView="dayGridMonth"

          height="700px"

          events={
            fullCalendarEvents
          }

          headerToolbar={{

            left:
              "prev,next today",

            center:
              "title",

            right:
              "dayGridMonth,timeGridWeek,timeGridDay",

          }}

          eventClick={(info) => {

            alert(

`Title:
${info.event.title}

Date:
${info.event.start?.toLocaleString()}`

            );

          }}

        />

      </div>

      {/* ==========================
          SEARCH
      ========================== */}

      <div className="search-card">

        <input

          type="text"

          placeholder="Search Events..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="search-input"

        />

      </div>

      {/* ==========================
          EVENT FORM
      ========================== */}

      <div className="calendar-form-card">

        <h2>

          {editingId
            ? "Update Event"
            : "Create Event"}

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

              placeholder="Event Title"

              value={
                formData.title
              }

              onChange={
                handleChange
              }

              required

            />

            <select

              name="event_type"

              value={
                formData.event_type
              }

              onChange={
                handleChange
              }

            >

              <option>
                Meeting
              </option>

              <option>
                FollowUp
              </option>

              <option>
                Task
              </option>

              <option>
                Reminder
              </option>

              <option>
                Personal
              </option>

            </select>

            <input

              type="datetime-local"

              name="start_date"

              value={
                formData.start_date
              }

              onChange={
                handleChange
              }

              required

            />

            <input

              type="datetime-local"

              name="end_date"

              value={
                formData.end_date
              }

              onChange={
                handleChange
              }

            />

            <input

              type="text"

              name="location"

              placeholder="Location"

              value={
                formData.location
              }

              onChange={
                handleChange
              }

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
                Critical
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
                Scheduled
              </option>

              <option>
                Completed
              </option>

              <option>
                Cancelled
              </option>

              <option>
                Postponed
              </option>

            </select>

          </div>

          <textarea

            rows="4"

            name="description"

            placeholder="Description"

            value={
              formData.description
            }

            onChange={
              handleChange
            }

          />

          <div
            className="form-actions"
          >

            <button

              type="submit"

              className="save-btn"

            >

              {editingId

                ? "Update Event"

                : "Create Event"}

            </button>

            {editingId && (

              <button

                type="button"

                className="cancel-btn"

                onClick={
                  resetForm
                }

              >

                Cancel

              </button>

            )}

          </div>

        </form>

      </div>

      {/* ==========================
          EVENTS TABLE
      ========================== */}

      <div className="table-card">

        <div
          className="table-header"
        >

          <h2>
            Calendar Events
          </h2>

          <span>

            {
              filteredEvents.length
            }

            {" "}
            Records

          </span>

        </div>

        <table
          className="calendar-table"
        >

          <thead>

            <tr>

              <th>
                Title
              </th>

              <th>
                Type
              </th>

              <th>
                Start
              </th>

              <th>
                Priority
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredEvents.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="empty-row"
                >

                  No Events Found

                </td>

              </tr>

            ) : (

              filteredEvents.map(
                (event) => (

                  <tr
                    key={event.id}
                  >

                    <td>
                      {event.title}
                    </td>

                    <td>
                      {event.event_type}
                    </td>

                    <td>

                      {new Date(
                        event.start_date
                      ).toLocaleString()}

                    </td>

                    <td>

                      <span
                        className={`priority-badge priority-${event.priority?.toLowerCase()}`}
                      >

                        {
                          event.priority
                        }

                      </span>

                    </td>

                    <td>

                      <span
                        className={`status-badge status-${event.status?.toLowerCase()}`}
                      >

                        {
                          event.status
                        }

                      </span>

                    </td>

                    <td
                      className="action-buttons"
                    >

                      <button

                        className="edit-btn"

                        onClick={() =>
                          handleEdit(
                            event
                          )
                        }

                      >

                        Edit

                      </button>

                      <button

                        className="delete-btn"

                        onClick={() =>
                          handleDelete(
                            event.id
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

export default Calendar;
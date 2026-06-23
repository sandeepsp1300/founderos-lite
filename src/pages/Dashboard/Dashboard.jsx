import { useEffect, useState } from "react";
import "./Dashboard.css";

import {
  getDashboardStats,
  getRecentInvestors,
  getUpcomingMeetings,
  getRecentTasks,
} from "../../services/dashboardService";

import { getProfile }
from "../../services/profileService";

function Dashboard() {

  const [loading, setLoading] =
    useState(true);

  const [profile, setProfile] =
    useState(null);

  const [stats, setStats] =
    useState({
      investors: 0,
      meetings: 0,
      tasks: 0,
      documents: 0,
      followups: 0,
      team: 0,
    });

  const [investors, setInvestors] =
    useState([]);

  const [meetings, setMeetings] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          setLoading(true);

          const [
            profileData,
            statsData,
            investorsData,
            meetingsData,
            tasksData,
          ] = await Promise.all([

            getProfile(),
            getDashboardStats(),
            getRecentInvestors(),
            getUpcomingMeetings(),
            getRecentTasks(),

          ]);

          setProfile(profileData);

          setStats(statsData);

          setInvestors(investorsData);

          setMeetings(meetingsData);

          setTasks(tasksData);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    loadDashboard();

  }, []);




  
  if (loading) {
    return (
      <div className="dashboard">
        <p>Loading...</p>
      </div>
    );
  }

  return (

    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <h1>

            Welcome Back,

            {
              profile?.full_name ||
              profile?.email ||
              "Founder"
            }

            👋

          </h1>

          <p>

            {
              profile?.startup_name ||
              "FounderOS Lite"
            }

          </p>

        </div>

      </div>

      <div className="stats-grid">

        <div className="stat-card">

          <h3>
            Investors
          </h3>

          <h2>
            {stats.investors}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Meetings
          </h3>

          <h2>
            {stats.meetings}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Tasks
          </h3>

          <h2>
            {stats.tasks}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Documents
          </h3>

          <h2>
            {stats.documents}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Follow Ups
          </h3>

          <h2>
            {stats.followups}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Team Members
          </h3>

          <h2>
            {stats.team}
          </h2>

        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h3>
            Startup Information
          </h3>

          <p>

            <strong>
              Startup:
            </strong>

            {" "}

            {
              profile?.startup_name ||
              "Not Set"
            }

          </p>

          <p>

            <strong>
              Industry:
            </strong>

            {" "}

            {
              profile?.industry ||
              "Not Set"
            }

          </p>

          <p>

            <strong>
              Stage:
            </strong>

            {" "}

            {
              profile?.startup_stage ||
              "Not Set"
            }

          </p>

          <p>

            <strong>
              Team Size:
            </strong>

            {" "}

            {
              profile?.team_size ||
              0
            }

          </p>

          <p>

            <strong>
              Funding Goal:
            </strong>

            ₹

            {
              profile?.funding_goal ||
              0
            }

          </p>

        </div>

        <div className="dashboard-card">

          <h3>
            Upcoming Meetings
          </h3>

          {

            meetings.length === 0 ?

            (
              <p>
                No Meetings Found
              </p>
            )

            :

            meetings.map(
              (meeting) => (

                <div
                  key={meeting.id}
                  className="meeting-item"
                >

                  <strong>
                    {meeting.title}
                  </strong>

                  <span>

                    {
                      meeting.meeting_date
                    }

                  </span>

                </div>

              )
            )

          }

        </div>

      </div>

      <div className="dashboard-card">

        <h3>
          Recent Investors
        </h3>

        <div
          className="table-container"
        >

          <table>

            <thead>

              <tr>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Type
                </th>

                <th>
                  Stage
                </th>

              </tr>

            </thead>

            <tbody>

              {

                investors.length === 0 ?

                (

                  <tr>

                    <td
                      colSpan="4"
                    >
                      No Investors Found
                    </td>

                  </tr>

                )

                :

                investors.map(
                  (investor) => (

                    <tr
                      key={
                        investor.id
                      }
                    >

                      <td>
                        {
                          investor.name
                        }
                      </td>

                      <td>
                        {
                          investor.email
                        }
                      </td>

                      <td>
                        {
                          investor.investor_type
                        }
                      </td>

                      <td>
                        {
                          investor.stage
                        }
                      </td>

                    </tr>

                  )
                )

              }

            </tbody>

          </table>

        </div>

      </div>

      <div className="dashboard-card">

        <h3>
          Recent Tasks
        </h3>

        <ul
          className="task-list"
        >

          {

            tasks.length === 0 ?

            (
              <li>
                No Tasks Found
              </li>
            )

            :

            tasks.map(
              (task) => (

                <li
                  key={task.id}
                >

                  <span>
                    {task.title}
                  </span>

                  <span>
                    {
                      task.priority
                    }
                  </span>

                </li>

              )
            )

          }

        </ul>

      </div>

    </div>

  );

}

export default Dashboard;


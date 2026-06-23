import { useState, useEffect } from "react";
import "./Analytics.css";

import { getInvestors } from "../../services/investorService";
import { getMeetings } from "../../services/meetingService";
import { getTasks } from "../../services/taskService";
import { getDocuments } from "../../services/documentService";
import { getFollowUps } from "../../services/followUpService";
import { getTeamMembers } from "../../services/teamService";


function Analytics() {
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [stats, setStats] =
    useState({
      investors: 0,
      meetings: 0,
      tasks: 0,
      documents: 0,
      followups: 0,
      team: 0,
    });

  // ==========================
  // LOAD ANALYTICS
  // ==========================

  const loadAnalytics =
    async () => {

      try {

        setLoading(true);

        const investorsResult =
          await getInvestors();

        const meetingsResult =
          await getMeetings();

        const tasksResult =
          await getTasks();

        const documentsResult =
          await getDocuments();

        const followupsResult =
          await getFollowUps();

        const teamResult =
          await getTeamMembers();

        setStats({
          investors:
            investorsResult.data?.length || 0,

          meetings:
            meetingsResult.data?.length || 0,

          tasks:
            tasksResult.data?.length || 0,

          documents:
            documentsResult.data?.length || 0,

          followups:
            followupsResult.data?.length || 0,

          team:
            teamResult.data?.length || 0,
        });

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load analytics data."
        );

      } finally {

        setLoading(false);

      }
    };

useEffect(() => {
  const fetchData = async () => {
    await loadAnalytics();
  };

  fetchData();
}, []);

  const totalRecords =
    stats.investors +
    stats.meetings +
    stats.tasks +
    stats.documents +
    stats.followups +
    stats.team;

  return (
    <div className="analytics-page">

      <div className="page-header">

        <h1>
          Analytics Dashboard
        </h1>

        <p>
          Monitor startup growth,
          investors, meetings,
          tasks, documents,
          follow-ups and team
          performance.
        </p>

      </div>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {loading ? (

        <div className="loading-card">

          <h2>
            Loading Analytics...
          </h2>

        </div>

      ) : (

        <>
          {/* STATS */}

          <div className="stats-grid">

            <div className="stat-card">
              <h3>Investors</h3>
              <h2>
                {stats.investors}
              </h2>
            </div>

            <div className="stat-card">
              <h3>Meetings</h3>
              <h2>
                {stats.meetings}
              </h2>
            </div>

            <div className="stat-card">
              <h3>Tasks</h3>
              <h2>
                {stats.tasks}
              </h2>
            </div>

            <div className="stat-card">
              <h3>Documents</h3>
              <h2>
                {stats.documents}
              </h2>
            </div>

            <div className="stat-card">
              <h3>Follow Ups</h3>
              <h2>
                {stats.followups}
              </h2>
            </div>

            <div className="stat-card">
              <h3>Team Members</h3>
              <h2>
                {stats.team}
              </h2>
            </div>

          </div>

          {/* SUMMARY */}

          <div className="analytics-card">

            <h2>
              Startup Summary
            </h2>

            <div className="summary-grid">

              <div>
                <strong>
                  Total Records
                </strong>

                <p>
                  {totalRecords}
                </p>
              </div>

              <div>
                <strong>
                  Investors
                </strong>

                <p>
                  {stats.investors}
                </p>
              </div>

              <div>
                <strong>
                  Meetings
                </strong>

                <p>
                  {stats.meetings}
                </p>
              </div>

              <div>
                <strong>
                  Team
                </strong>

                <p>
                  {stats.team}
                </p>
              </div>

            </div>

          </div>

          {/* ACTIVITY */}

          <div className="analytics-card">

            <h2>
              Activity Overview
            </h2>

            <ul>

              <li>
                Total Investors:
                {" "}
                {stats.investors}
              </li>

              <li>
                Total Meetings:
                {" "}
                {stats.meetings}
              </li>

              <li>
                Total Tasks:
                {" "}
                {stats.tasks}
              </li>

              <li>
                Total Documents:
                {" "}
                {stats.documents}
              </li>

              <li>
                Total Follow-Ups:
                {" "}
                {stats.followups}
              </li>

              <li>
                Total Team Members:
                {" "}
                {stats.team}
              </li>

            </ul>

          </div>

        </>
      )}

    </div>
  );
}

export default Analytics;


import { useState, useEffect } from "react";
import "./Team.css";

import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../../services/teamService";

import { supabase }
from "../../services/supabase";

function Team() {

  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      phone: "",

      role: "",

      department: "",

      designation: "",

      joined_date: "",

      status: "Active",

      salary: "",

      notes: "",

    });

  const loadMembers =
    async () => {

      setLoading(true);

      const {
        data,
        error,
      } =
        await getTeamMembers();

      if (!error) {

        setMembers(
          data || []
        );

      }

      setLoading(false);

    };

  
useEffect(() => {

  const fetchData = async () => {
    await loadMembers();
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

        name: "",

        email: "",

        phone: "",

        role: "",

        department: "",

        designation: "",

        joined_date: "",

        status: "Active",

        salary: "",

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
          await updateTeamMember(
            editingId,
            payload
          );

      } else {

        result =
          await createTeamMember(
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

      loadMembers();

    };

  const handleEdit =
    (member) => {

      setEditingId(
        member.id
      );

      setFormData({

        name:
          member.name,

        email:
          member.email,

        phone:
          member.phone,

        role:
          member.role,

        department:
          member.department,

        designation:
          member.designation,

        joined_date:
          member.joined_date,

        status:
          member.status,

        salary:
          member.salary,

        notes:
          member.notes,

      });

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete team member?"
        );

      if (!confirmDelete)
        return;

      const {
        error,
      } =
        await deleteTeamMember(
          id
        );

      if (error) {

        alert(
          error.message
        );

        return;

      }

      loadMembers();

    };

  const filteredMembers =
    members.filter(
      (member) =>

        member.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        member.role
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        member.department
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  const totalMembers =
    members.length;

  const activeMembers =
    members.filter(
      member =>
        member.status ===
        "Active"
    ).length;

  const onLeaveMembers =
    members.filter(
      member =>
        member.status ===
        "On Leave"
    ).length;

  const inactiveMembers =
    members.filter(
      member =>
        member.status ===
        "Inactive"
    ).length;

  if (loading) {

    return (

      <div className="team-page">

        <h2>
          Loading Team...
        </h2>

      </div>

    );

  }

  return (

    <div className="team-page">

      <div className="page-header">

        <h1>
          Team Management
        </h1>

        <p>
          Manage startup team
          members and roles.
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Members</h3>
          <h2>{totalMembers}</h2>
        </div>

        <div className="stat-card">
          <h3>Active</h3>
          <h2>{activeMembers}</h2>
        </div>

        <div className="stat-card">
          <h3>On Leave</h3>
          <h2>{onLeaveMembers}</h2>
        </div>

        <div className="stat-card">
          <h3>Inactive</h3>
          <h2>{inactiveMembers}</h2>
        </div>

      </div>

      <div className="team-form-card">

        <h2>

          {editingId
            ? "Update Member"
            : "Add Team Member"}

        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="form-grid">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
            />

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
            />

            <input
              type="date"
              name="joined_date"
              value={formData.joined_date}
              onChange={handleChange}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >

              <option>
                Active
              </option>

              <option>
                On Leave
              </option>

              <option>
                Inactive
              </option>

              <option>
                Resigned
              </option>

            </select>

            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleChange}
            />

          </div>

          <textarea
            rows="4"
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="save-btn"
          >

            {editingId
              ? "Update Member"
              : "Add Member"}

          </button>

        </form>

      </div>

      <div className="search-card">

        <input
          type="text"
          placeholder="Search team..."
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

        <table className="team-table">

          <thead>

            <tr>

              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredMembers.map(
              (member) => (

                <tr
                  key={member.id}
                >

                  <td>
                    {member.name}
                  </td>

                  <td>
                    {member.role}
                  </td>

                  <td>
                    {member.department}
                  </td>

                  <td>
                    {member.email}
                  </td>

                  <td>
                    {member.status}
                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(
                          member
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          member.id
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

export default Team;
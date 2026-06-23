import { useState, useEffect } from "react";
import "./Profile.css";

import {
getProfile,
updateProfile,
} from "../../services/profileService";

import { supabase } from "../../services/supabase";

function Profile() {

const [loading, setLoading] =
useState(true);

const [saving, setSaving] =
useState(false);

const [message, setMessage] =
useState("");

const [error, setError] =
useState("");


const [profile, setProfile] =
useState({


  full_name: "",
  email: "",

  startup_name: "",
  industry: "",
  startup_stage: "",

  website: "",
  linkedin: "",

  location: "",

  team_size: "",

  funding_goal: "",

  description: "",

});

const fetchProfile =
async () => {

  try {

    const {
      data: { user },
    } =
      await supabase
        .auth
        .getUser();

    if (!user) {

      setLoading(false);

      return;

    }

    const {
      data,
      error,
    } =
      await getProfile(
        user.id
      );

    if (error)
      throw error;

    if (data) {

      setProfile({

        full_name:
          data.full_name || "",

        email:
          data.email || "",

        startup_name:
          data.startup_name || "",

        industry:
          data.industry || "",

        startup_stage:
          data.startup_stage || "",

        website:
          data.website || "",

        linkedin:
          data.linkedin || "",

        location:
          data.location || "",

        team_size:
          data.team_size || "",

        funding_goal:
          data.funding_goal || "",

        description:
          data.description || "",

      });

    }

  } catch (err) {

    console.log(err);

  } finally {

    setLoading(false);

  }

};
useEffect(() => {
  const loadData = async () => {
    await fetchProfile();
  };

  loadData();
}, []);


const handleChange =
(e) => {


  setProfile({

    ...profile,

    [e.target.name]:
      e.target.value,

  });

};


const getCompletion =
() => {


  const fields = [

    profile.full_name,
    profile.email,
    profile.startup_name,
    profile.industry,
    profile.startup_stage,
    profile.website,
    profile.linkedin,
    profile.location,
    profile.team_size,
    profile.funding_goal,
    profile.description,

  ];

  const completed =
    fields.filter(
      (item) =>
        item !== "" &&
        item !== null
    ).length;

  return Math.round(
    (
      completed /
      fields.length
    ) * 100
  );

};


const handleSaveProfile =
async () => {


  try {

    setSaving(true);

    setError("");

    setMessage("");

    const {
      data: { user },
    } =
      await supabase
        .auth
        .getUser();

    if (!user) {

      setError(
        "User not found"
      );

      return;

    }

    const { error } =
      await updateProfile(
        user.id,
        profile
      );

    if (error)
      throw error;

    setMessage(
      "Profile updated successfully."
    );

  } catch (err) {

    setError(
      err.message
    );

  } finally {

    setSaving(false);

  }

};


if (loading) {


return (

  <div
    className="profile-loading"
  >
    Loading Profile...
  </div>

);


}

return (


<div className="profile-page">

  <div className="profile-header">

    <div>

      <h1>
        Startup Profile
      </h1>

      <p>
        Manage founder and startup information.
      </p>

    </div>

  </div>

  {message && (

    <div className="success-box">

      {message}

    </div>

  )}

  {error && (

    <div className="error-box">

      {error}

    </div>

  )}

  <div className="profile-stats">

    <div className="stat-card">

      <h3>
        Profile Completion
      </h3>

      <h2>
        {getCompletion()}%
      </h2>

    </div>

    <div className="stat-card">

      <h3>
        Startup Stage
      </h3>

      <h2>
        {profile.startup_stage || "-"}
      </h2>

    </div>

    <div className="stat-card">

      <h3>
        Industry
      </h3>

      <h2>
        {profile.industry || "-"}
      </h2>

    </div>

    <div className="stat-card">

      <h3>
        Funding Goal
      </h3>

      <h2>
        ₹
        {profile.funding_goal || 0}
      </h2>

    </div>

  </div>

  <div className="profile-card">

    <h2>
      Founder Information
    </h2>

    <div className="profile-grid">

      <div>

        <label>
          Full Name
        </label>

        <input
          type="text"
          name="full_name"
          value={profile.full_name}
          onChange={handleChange}
        />

      </div>

      <div>

        <label>
          Email
        </label>

        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />

      </div>

    </div>

    <h2>
      Startup Information
    </h2>

    <div className="profile-grid">

      <div>

        <label>
          Startup Name
        </label>

        <input
          type="text"
          name="startup_name"
          value={profile.startup_name}
          onChange={handleChange}
        />

      </div>

      <div>

        <label>
          Industry
        </label>

        <input
          type="text"
          name="industry"
          value={profile.industry}
          onChange={handleChange}
        />

      </div>

      <div>

        <label>
          Startup Stage
        </label>

        <select
          name="startup_stage"
          value={profile.startup_stage}
          onChange={handleChange}
        >

          <option value="">
            Select
          </option>

          <option>
            Idea
          </option>

          <option>
            MVP
          </option>

          <option>
            Pre-Seed
          </option>

          <option>
            Seed
          </option>

          <option>
            Series A
          </option>

        </select>

      </div>

      <div>

        <label>
          Location
        </label>

        <input
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange}
        />

      </div>

      <div>

        <label>
          Team Size
        </label>

        <input
          type="number"
          name="team_size"
          value={profile.team_size}
          onChange={handleChange}
        />

      </div>

      <div>

        <label>
          Funding Goal
        </label>

        <input
          type="number"
          name="funding_goal"
          value={profile.funding_goal}
          onChange={handleChange}
        />

      </div>

    </div>

    <h2>
      Online Presence
    </h2>

    <div className="profile-grid">

      <div>

        <label>
          Website
        </label>

        <input
          type="text"
          name="website"
          value={profile.website}
          onChange={handleChange}
        />

      </div>

      <div>

        <label>
          LinkedIn
        </label>

        <input
          type="text"
          name="linkedin"
          value={profile.linkedin}
          onChange={handleChange}
        />

      </div>

    </div>

    <h2>
      About Startup
    </h2>

    <textarea
      rows="6"
      name="description"
      value={profile.description}
      onChange={handleChange}
    />

    <button
      className="save-btn"
      onClick={handleSaveProfile}
      disabled={saving}
    >

      {
        saving
          ? "Saving..."
          : "Update Profile"
      }

    </button>

  </div>

</div>


);

}

export default Profile;

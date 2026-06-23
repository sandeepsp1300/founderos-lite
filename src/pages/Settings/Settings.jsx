import { useState, useEffect } from "react";
import "./Settings.css";

import {
  getSettings,
  saveSettings,
  uploadLogo,
  getBillingSummary,
} from "../../services/settingsService";

function Settings() {

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [billing, setBilling] =
    useState(null);

  const [selectedLogo, setSelectedLogo] =
    useState(null);

  const [formData, setFormData] =
    useState({

      company_name: "",

      company_email: "",

      company_phone: "",

      website: "",

      industry: "",

      startup_stage: "",

      founded_year: "",

      company_size: "",

      company_address: "",

      company_description: "",

      logo_url: "",

      currency: "INR",

      timezone: "Asia/Kolkata",

      theme: "Light",

      notifications_enabled:
        true,

      email_notifications:
        true,

      meeting_reminders:
        true,

      task_reminders:
        true,

      default_investor_stage:
        "Lead",

      default_task_priority:
        "Medium",

      default_meeting_status:
        "Upcoming",

    });

  /* ==========================
     LOAD SETTINGS
  ========================== */

  const loadData =
    async () => {

      try {

        setLoading(true);

        const settingsResult =
          await getSettings();

        const billingResult =
          await getBillingSummary();

        if (
          settingsResult.data
        ) {

          setFormData({

            ...formData,

            ...settingsResult.data,

          });

        }

        setBilling(
          billingResult.data
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

    const fetchData =
      async () => {

        await loadData();

      };

    fetchData();

  }, []);

  /* ==========================
     INPUT CHANGE
  ========================== */

  const handleChange =
    (e) => {

      const {
        name,
        value,
        type,
        checked,
      } = e.target;

      setFormData({

        ...formData,

        [name]:
          type ===
          "checkbox"
            ? checked
            : value,

      });

    };

  /* ==========================
     LOGO SELECT
  ========================== */

  const handleLogoChange =
    (e) => {

      if (
        e.target.files &&
        e.target.files[0]
      ) {

        setSelectedLogo(
          e.target.files[0]
        );

      }

    };

      /* ==========================
     SAVE SETTINGS
  ========================== */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setSaving(true);

        let logoUrl =
          formData.logo_url;

        /* Upload Logo */

        if (
          selectedLogo
        ) {

          const result =
            await uploadLogo(
              selectedLogo
            );

          if (
            result.error
          ) {

            alert(
              result.error
                .message ||
              "Logo upload failed"
            );

            return;

          }

          logoUrl =
            result.logoUrl;

        }

        const payload = {

          ...formData,

          logo_url:
            logoUrl,

        };

        const result =
          await saveSettings(
            payload
          );

        if (
          result.error
        ) {

          alert(
            result.error
              .message ||
            "Failed to save settings"
          );

          return;

        }

        alert(
          "Settings saved successfully"
        );

        loadData();

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Something went wrong"
        );

      } finally {

        setSaving(false);

      }

    };

  /* ==========================
     RESET FORM
  ========================== */

  const handleReset =
    () => {

      const confirmReset =
        window.confirm(
          "Reset all settings?"
        );

      if (
        !confirmReset
      )
        return;

      setFormData({

        company_name: "",

        company_email: "",

        company_phone: "",

        website: "",

        industry: "",

        startup_stage: "",

        founded_year: "",

        company_size: "",

        company_address: "",

        company_description: "",

        logo_url: "",

        currency: "INR",

        timezone:
          "Asia/Kolkata",

        theme:
          "Light",

        notifications_enabled:
          true,

        email_notifications:
          true,

        meeting_reminders:
          true,

        task_reminders:
          true,

        default_investor_stage:
          "Lead",

        default_task_priority:
          "Medium",

        default_meeting_status:
          "Upcoming",

      });

      setSelectedLogo(
        null
      );

    };

  /* ==========================
     EXPORT DATA
  ========================== */

  const handleExport =
    async () => {

      try {

        const data =
          {

            settings:
              formData,

            billing:
              billing,

          };

        const blob =
          new Blob(

            [
              JSON.stringify(
                data,
                null,
                2
              ),
            ],

            {
              type:
                "application/json",
            }

          );

        const url =
          URL.createObjectURL(
            blob
          );

        const link =
          document.createElement(
            "a"
          );

        link.href =
          url;

        link.download =
          "founderos-settings.json";

        link.click();

        URL.revokeObjectURL(
          url
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

      }

    };

  /* ==========================
     LOADING
  ========================== */

  if (loading) {

    return (

      <div className="settings-page">

        <h2>
          Loading Settings...
        </h2>

      </div>

    );

  }

    return (

    <div className="settings-page">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="page-header">

        <h1>
          Settings
        </h1>

        <p>
          Manage company profile,
          preferences, notifications
          and workspace settings.
        </p>

      </div>

      <form
        onSubmit={
          handleSubmit
        }
      >

        {/* ==========================
            COMPANY PROFILE
        ========================== */}

        <div className="settings-card">

          <h2>
            Company Profile
          </h2>

          <div className="logo-section">

            {formData.logo_url && (

              <img
                src={
                  formData.logo_url
                }
                alt="Company Logo"
                className="company-logo"
              />

            )}

            <input
              type="file"
              accept="image/*"
              onChange={
                handleLogoChange
              }
            />

          </div>

          <div className="form-grid">

            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={
                formData.company_name
              }
              onChange={
                handleChange
              }
            />

            <input
              type="email"
              name="company_email"
              placeholder="Company Email"
              value={
                formData.company_email
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="company_phone"
              placeholder="Company Phone"
              value={
                formData.company_phone
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="website"
              placeholder="Website"
              value={
                formData.website
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="industry"
              placeholder="Industry"
              value={
                formData.industry
              }
              onChange={
                handleChange
              }
            />

            <select
              name="startup_stage"
              value={
                formData.startup_stage
              }
              onChange={
                handleChange
              }
            >

              <option value="">
                Startup Stage
              </option>

              <option>
                Idea
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

              <option>
                Series B
              </option>

              <option>
                Growth
              </option>

            </select>

            <input
              type="text"
              name="founded_year"
              placeholder="Founded Year"
              value={
                formData.founded_year
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="company_size"
              placeholder="Company Size"
              value={
                formData.company_size
              }
              onChange={
                handleChange
              }
            />

          </div>

          <textarea
            rows="4"
            name="company_description"
            placeholder="Company Description"
            value={
              formData.company_description
            }
            onChange={
              handleChange
            }
          />

        </div>

        {/* ==========================
            CONTACT INFORMATION
        ========================== */}

        <div className="settings-card">

          <h2>
            Contact Information
          </h2>

          <textarea
            rows="3"
            name="company_address"
            placeholder="Company Address"
            value={
              formData.company_address
            }
            onChange={
              handleChange
            }
          />

        </div>

        {/* ==========================
            PREFERENCES
        ========================== */}

        <div className="settings-card">

          <h2>
            Preferences
          </h2>

          <div className="form-grid">

            <select
              name="currency"
              value={
                formData.currency
              }
              onChange={
                handleChange
              }
            >

              <option>
                INR
              </option>

              <option>
                USD
              </option>

              <option>
                EUR
              </option>

              <option>
                GBP
              </option>

              <option>
                AED
              </option>

            </select>

            <select
              name="timezone"
              value={
                formData.timezone
              }
              onChange={
                handleChange
              }
            >

              <option>
                Asia/Kolkata
              </option>

              <option>
                UTC
              </option>

              <option>
                America/New_York
              </option>

              <option>
                Europe/London
              </option>

            </select>

            <select
              name="theme"
              value={
                formData.theme
              }
              onChange={
                handleChange
              }
            >

              <option>
                Light
              </option>

              <option>
                Dark
              </option>

              <option>
                System
              </option>

            </select>

          </div>

        </div>

                {/* ==========================
            NOTIFICATIONS
        ========================== */}

        <div className="settings-card">

          <h2>
            Notifications
          </h2>

          <div className="checkbox-group">

            <label>

              <input
                type="checkbox"
                name="notifications_enabled"
                checked={
                  formData.notifications_enabled
                }
                onChange={
                  handleChange
                }
              />

              Enable Notifications

            </label>

            <label>

              <input
                type="checkbox"
                name="email_notifications"
                checked={
                  formData.email_notifications
                }
                onChange={
                  handleChange
                }
              />

              Email Notifications

            </label>

            <label>

              <input
                type="checkbox"
                name="meeting_reminders"
                checked={
                  formData.meeting_reminders
                }
                onChange={
                  handleChange
                }
              />

              Meeting Reminders

            </label>

            <label>

              <input
                type="checkbox"
                name="task_reminders"
                checked={
                  formData.task_reminders
                }
                onChange={
                  handleChange
                }
              />

              Task Reminders

            </label>

          </div>

        </div>

        {/* ==========================
            CRM DEFAULTS
        ========================== */}

        <div className="settings-card">

          <h2>
            CRM Defaults
          </h2>

          <div className="form-grid">

            <select
              name="default_investor_stage"
              value={
                formData.default_investor_stage
              }
              onChange={
                handleChange
              }
            >

              <option>
                Lead
              </option>

              <option>
                Contacted
              </option>

              <option>
                Interested
              </option>

              <option>
                Meeting
              </option>

              <option>
                Invested
              </option>

              <option>
                Rejected
              </option>

            </select>

            <select
              name="default_task_priority"
              value={
                formData.default_task_priority
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
              name="default_meeting_status"
              value={
                formData.default_meeting_status
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

          </div>

        </div>

        {/* ==========================
            BILLING SUMMARY
        ========================== */}

        <div className="settings-card">

          <h2>
            Subscription
          </h2>

          {billing ? (

            <div className="billing-summary">

              <div>

                <strong>
                  Plan
                </strong>

                <p>
                  {
                    billing.plan_name
                  }
                </p>

              </div>

              <div>

                <strong>
                  Amount
                </strong>

                <p>
                  ₹
                  {
                    billing.amount
                  }
                </p>

              </div>

              <div>

                <strong>
                  Status
                </strong>

                <p>
                  {
                    billing.status
                  }
                </p>

              </div>

              <div>

                <strong>
                  Renewal Date
                </strong>

                <p>
                  {
                    billing.next_billing_date
                  }
                </p>

              </div>

            </div>

          ) : (

            <p>
              No subscription found.
            </p>

          )}

        </div>

        {/* ==========================
            DATA MANAGEMENT
        ========================== */}

        <div className="settings-card">

          <h2>
            Data Management
          </h2>

          <div className="button-group">

            <button
              type="button"
              className="export-btn"
              onClick={
                handleExport
              }
            >

              Export Settings

            </button>

          </div>

        </div>

        {/* ==========================
            DANGER ZONE
        ========================== */}

        <div className="danger-card">

          <h2>
            Danger Zone
          </h2>

          <p>
            Reset all settings to
            default values.
          </p>

          <button
            type="button"
            className="reset-btn"
            onClick={
              handleReset
            }
          >

            Reset Settings

          </button>

        </div>

        {/* ==========================
            SAVE BUTTON
        ========================== */}

        <div className="save-section">

          <button
            type="submit"
            className="save-btn"
            disabled={
              saving
            }
          >

            {saving
              ? "Saving..."
              : "Save Settings"}

          </button>

        </div>

      </form>

    </div>

  );

}

export default Settings;
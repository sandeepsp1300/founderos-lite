
import { useState, useEffect } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  logoutUser,
  getCurrentUser,
} from "../services/authService";

import {
  getProfile,
} from "../services/profileService";

import "./Sidebar.css";

function Sidebar() {

  const navigate =
    useNavigate();

  const [user, setUser] =
    useState(null);

  const [progress, setProgress] =
    useState(0);

  const [mobileMenuOpen,
    setMobileMenuOpen] =
    useState(false);

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const {
            user,
          } =
            await getCurrentUser();

          setUser(user);

          if (!user?.id)
            return;

          const {
            data: profileData,
          } =
            await getProfile(
              user.id
            );

          if (!profileData)
            return;

          const fields = [

            profileData.full_name,
            profileData.email,
            profileData.startup_name,
            profileData.industry,
            profileData.startup_stage,
            profileData.website,
            profileData.linkedin,
            profileData.location,
            profileData.team_size,
            profileData.funding_goal,
            profileData.description,

          ];

          const completed =
            fields.filter(
              field =>
                field !== null &&
                field !== "" &&
                field !== undefined
            ).length;

          setProgress(

            Math.round(

              (completed /
                fields.length)

              * 100

            )

          );

        }

        catch (error) {

          console.error(
            error
          );

        }

      };

    fetchUser();

  }, []);

  const handleLogout =
    async () => {

      try {

        const {
          error,
        } =
          await logoutUser();

        if (error) {

          alert(
            error.message
          );

          return;

        }

        navigate(
          "/login"
        );

      }

      catch (error) {

        console.error(
          error
        );

      }

    };

  const menuSections = [

    {
      title: "MAIN",
      items: [
        {
          icon: "🏠",
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          icon: "📊",
          label: "Analytics",
          path: "/analytics",
        },
      ],
    },

    {
      title: "CRM",
      items: [
        {
          icon: "💰",
          label: "Investors",
          path: "/investors",
        },
        {
          icon: "📅",
          label: "Meetings",
          path: "/meetings",
        },
        {
          icon: "🔔",
          label: "Follow Ups",
          path: "/followups",
        },
      ],
    },

    {
      title: "PRODUCTIVITY",
      items: [
        {
          icon: "✅",
          label: "Tasks",
          path: "/tasks",
        },
        {
          icon: "🗓️",
          label: "Calendar",
          path: "/calendar",
        },
        {
          icon: "📄",
          label: "Documents",
          path: "/documents",
        },
      ],
    },

    {
      title: "TEAM",
      items: [
        {
          icon: "👥",
          label: "Team",
          path: "/team",
        },
        {
          icon: "👤",
          label: "Profile",
          path: "/profile",
        },
      ],
    },

    {
      title: "BUSINESS",
      items: [
        {
          icon: "💳",
          label: "Billing",
          path: "/billing",
        },
      ],
    },

    {
      title: "SUPPORT",
      items: [
        {
          icon: "📞",
          label: "Contact",
          path: "/contact",
        },
        {
          icon: "ℹ️",
          label: "About",
          path: "/about",
        },
      ],
    },

  ];

  return (

    <aside className="sidebar">

      {/* Mobile Header */}

      <div className="mobile-topbar">

        <button
          className="mobile-menu-btn"
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }
        >
          ☰
        </button>

        <h2>
          FounderOS
        </h2>

      </div>

      <div
        className={`sidebar-content ${mobileMenuOpen
            ? "show"
            : ""
          }`}
      >

        <div className="sidebar-header">

          <div className="brand-logo">
            🚀
          </div>

          <div>

            <h2>
              Investor CRM
            </h2>

            <p>
              FounderOS Lite
            </p>

          </div>

        </div>

        <div
          className="profile-widget"
          onClick={() =>
            navigate("/profile")
          }
        >

          <div className="avatar">

            {
              user?.email
                ?.charAt(0)
                ?.toUpperCase()
              || "U"
            }

          </div>

          <div className="profile-info">

            <h3>

              {
                user?.email
                  ?.split("@")[0]
                || "User"
              }

            </h3>

            <span>

              {
                user?.email
                || "No Email"
              }

            </span>

          </div>

        </div>

        <div className="health-widget">

          <div className="health-top">

            <span>
              Profile Completion
            </span>

            <strong>
              {progress}%
            </strong>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width:
                  `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* Navigation */}

        <div className="menu-wrapper">

          {menuSections.map(
            (section) => (

              <div
                key={section.title}
                className="menu-group"
              >

                <h4>
                  {section.title}
                </h4>

                {section.items.map(
                  (item) => (

                    <NavLink

                      key={item.path}

                      to={item.path}

                      onClick={() =>
                        setMobileMenuOpen(
                          false
                        )
                      }

                      className={(
                        {
                          isActive,
                        }
                      ) =>

                        isActive

                          ? "menu-item active"

                          : "menu-item"

                      }

                    >

                      <span>

                        {item.icon}

                      </span>

                      {item.label}

                    </NavLink>

                  )
                )}

              </div>

            )
          )}

        </div>

        {/* Footer */}

        <div className="sidebar-footer">

          <button

            className="logout-btn"

            onClick={
              handleLogout
            }

          >

            🚪 Logout

          </button>

        </div>

      </div>

    </aside>

  );

}

export default Sidebar;


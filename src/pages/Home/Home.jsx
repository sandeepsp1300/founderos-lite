import { useNavigate } from "react-router-dom";
import "./Home.css";


import { useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../../services/emailjs";


function Home() {



  const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: ""
});

const [sending, setSending] = useState(false);

const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

};

const handleSubmit = async (e) => {

  e.preventDefault();

  setSending(true);

  try {

    await emailjs.send(

      EMAILJS_CONFIG.SERVICE_ID,

      EMAILJS_CONFIG.TEMPLATE_ID,

      {
        user_name: formData.name,
        user_email: formData.email,
        title: formData.subject,
        message: formData.message
      },

      EMAILJS_CONFIG.PUBLIC_KEY

    );

    alert("Message Sent Successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

  } catch (error) {

    console.error(error);

    alert("Failed To Send Message");

  } finally {

    setSending(false);

  }

};
  const navigate = useNavigate();

  const features = [
    {
      title: "Investor Management",
      desc: "Manage investor profiles, contacts and interactions."
    },
    {
      title: "Fundraising Pipeline",
      desc: "Track investors from lead to investment."
    },
    {
      title: "Meeting Management",
      desc: "Schedule and manage investor meetings."
    },
    {
      title: "Document Vault",
      desc: "Store pitch decks, reports and legal documents."
    },
    {
      title: "Analytics Dashboard",
      desc: "Monitor fundraising performance and growth."
    },
    {
      title: "Follow-Ups & Tasks",
      desc: "Never miss investor communications."
    }
  ];

  return (

    <div className="landing-page">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="logo">
          FounderOS
        </div>

        <nav>

          <a href="#features">
            Features
          </a>

          <a href="#solutions">
            Solutions
          </a>

          <a href="#pricing">
            Pricing
          </a>

          <a href="#contact">
            Contact
          </a>

        </nav>

        <div className="nav-actions">

          <button
            className="login-btn"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>

        </div>

      </header>

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            Investor CRM Platform
          </span>

          <h1>
            Manage Investors.
            Track Fundraising.
            Close Deals Faster.
          </h1>

          <p>

            FounderOS helps startups,
            founders, incubators and
            venture capital firms manage
            fundraising from a single
            centralized platform.

          </p>

          <div className="hero-buttons">

            <button
              onClick={() =>
                navigate("/register")
              }
            >
              Start Free Trial
            </button>

            <button
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="stats-section">

        <div className="stat-card">
          <h2>500+</h2>
          <p>Startups</p>
        </div>

        <div className="stat-card">
          <h2>5,000+</h2>
          <p>Investors Managed</p>
        </div>

        <div className="stat-card">
          <h2>₹250Cr+</h2>
          <p>Funding Tracked</p>
        </div>

        <div className="stat-card">
          <h2>99.9%</h2>
          <p>Availability</p>
        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="features-section"
      >

        <h2>
          Platform Features
        </h2>

        <div className="features-grid">

          {features.map(
            (feature) => (

              <div
                key={feature.title}
                className="feature-card"
              >

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.desc}
                </p>

              </div>

            )
          )}

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section
        className="how-section"
      >

        <h2>
          How FounderOS Works
        </h2>

        <div className="steps">

          <div>
            Create Account
          </div>

          <div>
            Add Investors
          </div>

          <div>
            Schedule Meetings
          </div>

          <div>
            Track Pipeline
          </div>

          <div>
            Raise Funding
          </div>

        </div>

      </section>

      {/* SOLUTIONS */}

      <section
        id="solutions"
        className="solutions-section"
      >

        <h2>
          Who Uses FounderOS
        </h2>

        <div className="solutions-grid">

          <div>
            <h3>Startups</h3>
            <p>
              Manage fundraising and
              investor relations.
            </p>
          </div>

          <div>
            <h3>Incubators</h3>
            <p>
              Monitor startup progress.
            </p>
          </div>

          <div>
            <h3>VC Firms</h3>
            <p>
              Track startup opportunities.
            </p>
          </div>

          <div>
            <h3>Accelerators</h3>
            <p>
              Manage portfolio companies.
            </p>
          </div>

        </div>

      </section>

      {/* PRICING */}

      <section
        id="pricing"
        className="pricing-section"
      >

        <div className="section-header">

          <span>
            PRICING
          </span>

          <h2>
            Simple Pricing For Every Startup
          </h2>

          <p>
            Start free and upgrade as your business grows.
          </p>

        </div>

        <div className="pricing-grid">

          {/* FREE TRIAL */}

          <div className="price-card">

            <h3>
              Free Trial
            </h3>

            <h1>
              ₹0
            </h1>

            <p>
              1 Day Access
            </p>

            <ul>

              <li>✓ Dashboard Access</li>
              <li>✓ Task Management</li>
              <li>✓ Meetings</li>
              <li>✓ Documents</li>
              <li>✓ Basic Analytics</li>

            </ul>



          </div>

          {/* STARTER */}

          <div className="price-card featured">

            <div className="popular-tag">

              MOST POPULAR

            </div>

            <h3>
              Starter
            </h3>

            <h1>
              ₹499
            </h1>

            <p>
              Per Month
            </p>

            <ul>

              <li>✓ Everything in Free Trial</li>
              <li>✓ Unlimited Tasks</li>
              <li>✓ Unlimited Meetings</li>
              <li>✓ Investor CRM</li>
              <li>✓ Team Collaboration</li>
              <li>✓ Email Integration</li>
              <li>✓ Priority Support</li>

            </ul>

            <button
              className="price-btn"
              onClick={() => navigate("/login")}
            >

              Upgrade to Starter

            </button>

          </div>

          {/* ENTERPRISE */}

          <div className="price-card">

            <h3>
              Enterprise
            </h3>

            <h1>
              ₹4999
            </h1>

            <p>
              Per Year
            </p>

            <ul>

              <li>✓ Everything in Starter</li>
              <li>✓ Unlimited Team Members</li>
              <li>✓ Advanced Analytics</li>
              <li>✓ Custom Reports</li>
              <li>✓ API Access</li>
              <li>✓ Role Permissions</li>
              <li>✓ Dedicated Account Manager</li>
              <li>✓ 24/7 Priority Support</li>

            </ul>

            <button
              className="price-btn"
              onClick={() => navigate("/login")}
            >
              Upgrade to Starter
            </button>

          </div>

        </div>

      </section>

      {/* CONTACT */}

      <section
  id="contact"
  className="contact-section"
>

  <div className="contact-form-card">

    <h2>

            Send Us A Message

          </h2>

          <form

            onSubmit={handleSubmit}

            className="contact-form"

          >

            <div className="form-group">

              <label>

                Full Name

              </label>

              <input

                type="text"

                name="name"

                value={formData.name}

                onChange={handleChange}

                placeholder="Enter your name"

                required

              />

            </div>

            <div className="form-group">

              <label>

                Email Address

              </label>

              <input

                type="email"

                name="email"

                value={formData.email}

                onChange={handleChange}

                placeholder="Enter your email"

                required

              />

            </div>

            <div className="form-group">

              <label>

                Subject

              </label>

              <input

                type="text"

                name="subject"

                value={formData.subject}

                onChange={handleChange}

                placeholder="Enter subject"

                required

              />

            </div>

            <div className="form-group">

              <label>

                Message

              </label>

              <textarea

                name="message"

                value={formData.message}

                onChange={handleChange}

                placeholder="Write your message..."

                rows="6"

                required

              />

            </div>

            <button

              type="submit"

              className="submit-btn"

              disabled={sending}

            >

              {

                sending

                ? "Sending..."

                : "Send Message"

              }

            </button>

          </form>

  </div>

</section>

      {/* FOOTER */}

      <footer>

        <h3>
          FounderOS
        </h3>

        <p>
          Investor Relationship
          Management Platform
        </p>

        <button
          onClick={() =>
            navigate("/register")
          }
        >
          Get Started
        </button>

      </footer>

    </div>

  );

}

export default Home;

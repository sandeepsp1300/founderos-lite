import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

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

        <h2>
          Pricing Plans
        </h2>

        <div className="pricing-grid">

          <div className="price-card">
            <h3>Starter</h3>
            <h1>₹499</h1>
            <p>Per Month</p>
          </div>

          <div className="price-card featured">
            <h3>Professional</h3>
            <h1>₹999</h1>
            <p>Per Month</p>
          </div>

          <div className="price-card">
            <h3>Enterprise</h3>
            <h1>Custom</h1>
            <p>Contact Sales</p>
          </div>

        </div>

      </section>

      {/* CONTACT */}

      <section
        id="contact"
        className="contact-section"
      >

        <h2>
          Contact Us
        </h2>

        <form>

          <input
            type="text"
            placeholder="Your Name"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <textarea
            placeholder="Message"
          />

          <button
            type="submit"
          >
            Send Message
          </button>

        </form>

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

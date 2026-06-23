import { useState } from "react";

import emailjs from "@emailjs/browser";

import "./Contact.css";

import { EMAILJS_CONFIG }
from "../../services/emailjs";




function Contact() {

  const [

    formData,

    setFormData

  ] = useState({

    name: "",

    email: "",

    subject: "",

    message: ""

  });

  const [

    sending,

    setSending

  ] = useState(false);

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setSending(true);

      try {
try {

  await emailjs.send(

    EMAILJS_CONFIG.SERVICE_ID,

    EMAILJS_CONFIG.TEMPLATE_ID,

    {

      user_name: formData.name,

      user_email: formData.email,

      title: formData.subject,

      message: formData.message,

    },

    EMAILJS_CONFIG.PUBLIC_KEY

  );

  alert(
    "Message Sent Successfully!"
  );

  setFormData({

    name: "",

    email: "",

    subject: "",

    message: ""

  });

}

catch (error) {

  console.error(
    "EmailJS Error:",
    error
  );

  alert(
    error?.text ||
    error?.message ||
    "Failed To Send Message"
  );

}

      }

      catch (error) {

        console.error(error);

        alert(
          "Failed To Send Message"
        );

      }

      finally {

        setSending(false);

      }

    };

  return (

    <div className="contact-page">

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <div className="contact-hero">

        <h1>

          Contact FounderOS

        </h1>

        <p>

          Have questions,
          suggestions,
          partnership opportunities,
          or need support?

          Our team is ready
          to help.

        </p>

      </div>

      {/* =========================================
          CONTACT SECTION
      ========================================= */}

      <div className="contact-container">

        {/* LEFT SIDE */}

        <div className="contact-info">

          <h2>

            Get In Touch

          </h2>

          <p>

            We'd love to hear
            from you.

            Contact us regarding
            support, business,
            partnerships,
            feedback,
            or product inquiries.

          </p>

          <div className="info-card">

            <h3>

              Email

            </h3>

            <p>

              sp13sandeep@gmail.com

            </p>

          </div>

          <div className="info-card">

            <h3>

              Phone

            </h3>

            <p>

              +91 90285 13769

            </p>

          </div>

          <div className="info-card">

            <h3>

              Location

            </h3>

            <p>

              Mumbai,
              Maharashtra,
              India

            </p>

          </div>

          <div className="info-card">

            <h3>

              Working Hours

            </h3>

            <p>

              Monday - Friday

              <br />

              9:00 AM - 6:00 PM

            </p>

          </div>

        </div>
                {/* =========================================
            CONTACT FORM
        ========================================= */}

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

      </div>
            {/* =========================================
          FAQ SECTION
      ========================================= */}

      <section className="faq-section">

        <h2>

          Frequently Asked Questions

        </h2>

        <div className="faq-grid">

          <div className="faq-card">

            <h3>

              What is FounderOS?

            </h3>

            <p>

              FounderOS is an all-in-one
              CRM and business operating
              system designed for startups,
              founders, entrepreneurs,
              consultants, and growing
              businesses.

            </p>

          </div>

          <div className="faq-card">

            <h3>

              How can I contact support?

            </h3>

            <p>

              You can submit the contact
              form above and our team
              will respond as soon as
              possible.

            </p>

          </div>

          <div className="faq-card">

            <h3>

              Is FounderOS secure?

            </h3>

            <p>

              Yes. FounderOS uses modern
              authentication, secure cloud
              infrastructure, and protected
              databases to keep your data safe.

            </p>

          </div>

          <div className="faq-card">

            <h3>

              Who can use FounderOS?

            </h3>

            <p>

              Startups, founders,
              entrepreneurs, consultants,
              sales teams, agencies,
              and growing businesses.

            </p>

          </div>

        </div>

      </section>

      {/* =========================================
          SUPPORT SECTION
      ========================================= */}

      <section className="faq-section">

        <h2>

          Support & Business Inquiries

        </h2>

        <div className="faq-grid">

          <div className="faq-card">

            <h3>

              Technical Support

            </h3>

            <p>

              Report bugs, technical issues,
              account problems, or platform
              related questions.

            </p>

          </div>

          <div className="faq-card">

            <h3>

              Business Partnerships

            </h3>

            <p>

              Contact us for collaborations,
              partnerships, investment,
              and business opportunities.

            </p>

          </div>

          <div className="faq-card">

            <h3>

              Product Feedback

            </h3>

            <p>

              Share your ideas and help
              us improve FounderOS.

            </p>

          </div>

          <div className="faq-card">

            <h3>

              Feature Requests

            </h3>

            <p>

              Suggest new features,
              improvements, and future
              enhancements.

            </p>

          </div>

        </div>

      </section>

      {/* =========================================
          FOOTER
      ========================================= */}

      <div className="contact-footer">

        <h2>

          FounderOS

        </h2>

        <p>

          One Platform.
          Complete Business Control.

        </p>

        <p>

          Manage Investors.
          Schedule Meetings.
          Track Tasks.
          Monitor Follow-Ups.
          Handle Billing.
          Store Documents.
          Analyze Performance.

        </p>

        <p>

          © 2026 FounderOS.
          All Rights Reserved.

        </p>

      </div>

    </div>

  );

}

export default Contact;
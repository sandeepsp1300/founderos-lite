import { useEffect, useState } from "react";
import "./Investors.css";

import {
  getInvestors,
  createInvestor,
  updateInvestor,
  deleteInvestor,
} from "../../services/investorService";

import { supabase } from "../../services/supabase";

function Investors() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    investor_type: "Angel",
    stage: "Lead",
    investment_amount: "",
    notes: "",
  });


  const [showModal, setShowModal] =
  useState(false);

const [editingId, setEditingId] =
  useState(null);

const [stageFilter, setStageFilter] =
  useState("All");

const [message, setMessage] =
  useState("");






  // FETCH INVESTORS
  const fetchInvestors = async () => {
    setLoading(true);

    const { data, error } = await getInvestors();

    if (error) {
      console.error(error);
    } else {
      setInvestors(data || []);
    }

    setLoading(false);
  };

  // LOAD DATA
  useEffect(() => {
  const loadData = async () => {
    await fetchInvestors();
  };

  loadData();
}, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD INVESTOR
  const handleSaveInvestor =
  async (e) => {

    e.preventDefault();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      alert("Login First");
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
        await updateInvestor(
          editingId,
          payload
        );

    } else {

      result =
        await createInvestor(
          payload
        );

    }

    if (result.error) {

      alert(
        result.error.message
      );

      return;

    }

    setMessage(
      editingId
        ? "Investor Updated"
        : "Investor Added"
    );

    setFormData({

      name: "",
      email: "",
      phone: "",
      investor_type: "Angel",
      stage: "Lead",
      investment_amount: "",
      notes: "",

    });

    setEditingId(null);

    setShowModal(false);

    fetchInvestors();

  };

  const handleEditInvestor =
  (investor) => {

    setFormData({

      name:
        investor.name || "",

      email:
        investor.email || "",

      phone:
        investor.phone || "",

      investor_type:
        investor.investor_type || "",

      stage:
        investor.stage || "",

      investment_amount:
        investor.investment_amount || "",

      notes:
        investor.notes || "",

    });

    setEditingId(
      investor.id
    );

    setShowModal(true);

  };

  <div className="stat-card">

  <h3>
    Funding Raised
  </h3>

  <h2>

    ₹

    {
      investors.reduce(

        (sum, item) =>

          sum +

          Number(
            item.investment_amount || 0
          ),

        0

      )
    }

  </h2>

</div>

  // DELETE INVESTOR
  const handleDeleteInvestor = async (
    id
  ) => {
    const confirmDelete = window.confirm(
      "Delete this investor?"
    );

    if (!confirmDelete) return;

    const { error } =
      await deleteInvestor(id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchInvestors();
  };

  // SEARCH
  const filteredInvestors =
  investors.filter(
    (investor) => {

      const searchMatch =

        investor.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        investor.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const stageMatch =

        stageFilter ===
        "All"

        ||

        investor.stage ===
        stageFilter;

      return (
        searchMatch &&
        stageMatch
      );

    }
  );

  return (
    <div className="investors-page">
      <div className="page-header">
        <div>
          <h1>Investor CRM</h1>
          <p>
            Manage investor relationships
            and fundraising activities.
          </p>
        </div>
      </div>

      {/* STATS */}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Investors</h3>
          <h2>{investors.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Interested</h3>
          <h2>
            {
              investors.filter(
                (i) =>
                  i.stage ===
                  "Interested"
              ).length
            }
          </h2>
        </div>

        <div className="stat-card">
          <h3>Invested</h3>
          <h2>
            {
              investors.filter(
                (i) =>
                  i.stage ===
                  "Invested"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* FORM */}

      <div className="form-card">
        <h2>Add Investor</h2>

        <form onSubmit={handleSaveInvestor}>
        
          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Investor Name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />

            <input
              type="number"
              name="investment_amount"
              placeholder="Investment Amount"
              value={
                formData.investment_amount
              }
              onChange={handleChange}
              className="form-control"
            />

            <select
              name="investor_type"
              value={
                formData.investor_type
              }
              onChange={handleChange}
              className="form-control"
            >
              <option>Angel</option>
              <option>VC</option>
              <option>Incubator</option>
              <option>Accelerator</option>
            </select>

            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="form-control"
            >
              <option>Lead</option>
              <option>
                Contacted
              </option>
              <option>
                Meeting Scheduled
              </option>
              <option>
                Interested
              </option>
              <option>
                Invested
              </option>
              <option>
                Rejected
              </option>
            </select>
          </div>

          <textarea
            rows="5"
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="notes-area"
          />

          <button
            type="submit"
            className="submit-btn"
          >
            Add Investor
          </button>
        </form>
      </div>

      {/* SEARCH */}

      <div className="search-card">
        <input
          type="text"
          placeholder="Search Investor..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="search-input"
        />
      </div>

<select
  value={stageFilter}
  onChange={(e) =>
    setStageFilter(
      e.target.value
    )
  }
>

  <option>
    All
  </option>

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
    Invested
  </option>

  <option>
    Rejected
  </option>

</select>

      {/* TABLE */}

      <div className="table-card">
        <h2>Investor List</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="investor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Stage</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvestors.map(
                (investor) => (
                  <tr
                    key={investor.id}
                  >
                    <td>
                      {investor.name}
                    </td>

                    <td>
                      {investor.email}
                    </td>

                    <td>
                      {investor.phone}
                    </td>

                    <td>
                      {
                        investor.investor_type
                      }
                    </td>

                    <td>
                      {investor.stage}
                    </td>

                    <td>
                      ₹
                      {
                        investor.investment_amount
                      }
                    </td>

                    <td>
                      <div className="action-buttons">

  <button
    className="edit-btn"
    onClick={() =>
      handleEditInvestor(
        investor
      )
    }
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() =>
      handleDeleteInvestor(
        investor.id
      )
    }
  >
    Delete
  </button>

</div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Investors;
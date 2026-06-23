import { useState, useEffect } from "react";
import "./Billing.css";

import {
  getBillingRecords,
  createBilling,
  updateBilling,
  deleteBilling,
} from "../../services/billingService";

import { supabase }
from "../../services/supabase";

function Billing() {

  const [billingRecords, setBillingRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      plan_name: "Starter",

      amount: "",

      currency: "INR",

      billing_cycle: "Monthly",

      billing_date: "",

      next_billing_date: "",

      payment_method: "UPI",

      transaction_id: "",

      status: "Pending",

      notes: "",

    });

  /* ==========================
     LOAD DATA
  ========================== */

  const loadData =
    async () => {

      try {

        setLoading(true);

        const {
          data,
          error,
        } =
          await getBillingRecords();

        if (!error) {

          setBillingRecords(
            data || []
          );

        }

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

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

      /* ==========================
     RESET FORM
  ========================== */

  const resetForm =
    () => {

      setEditingId(null);

      setFormData({

        plan_name: "Starter",

        amount: "",

        currency: "INR",

        billing_cycle: "Monthly",

        billing_date: "",

        next_billing_date: "",

        payment_method: "UPI",

        transaction_id: "",

        status: "Pending",

        notes: "",

      });

    };

  /* ==========================
     CREATE / UPDATE
  ========================== */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {

        alert(
          "Please login first"
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
          await updateBilling(
            editingId,
            payload
          );

      } else {

        result =
          await createBilling(
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

      loadData();

    };

  /* ==========================
     EDIT BILLING
  ========================== */

  const handleEdit =
    (bill) => {

      setEditingId(
        bill.id
      );

      setFormData({

        plan_name:
          bill.plan_name,

        amount:
          bill.amount,

        currency:
          bill.currency,

        billing_cycle:
          bill.billing_cycle,

        billing_date:
          bill.billing_date,

        next_billing_date:
          bill.next_billing_date,

        payment_method:
          bill.payment_method,

        transaction_id:
          bill.transaction_id,

        status:
          bill.status,

        notes:
          bill.notes,

      });

    };

  /* ==========================
     DELETE BILLING
  ========================== */

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete billing record?"
        );

      if (!confirmDelete)
        return;

      const {
        error,
      } =
        await deleteBilling(
          id
        );

      if (error) {

        alert(
          error.message
        );

        return;

      }

      loadData();

    };

  /* ==========================
     SEARCH
  ========================== */

  const filteredBilling =
    billingRecords.filter(
      (bill) =>

        bill.plan_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        bill.status
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        bill.transaction_id
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  /* ==========================
     STATS
  ========================== */

  const totalInvoices =
    billingRecords.length;

  const totalRevenue =
    billingRecords.reduce(

      (
        total,
        bill
      ) =>

        total +

        Number(
          bill.amount || 0
        ),

      0

    );

  const paidInvoices =
    billingRecords.filter(
      bill =>
        bill.status ===
        "Paid"
    ).length;

  const pendingInvoices =
    billingRecords.filter(
      bill =>
        bill.status ===
        "Pending"
    ).length;

      /* ==========================
     LOADING
  ========================== */

  if (loading) {

    return (

      <div className="billing-page">

        <h2>
          Loading Billing...
        </h2>

      </div>

    );

  }

  return (

    <div className="billing-page">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="page-header">

        <h1>
          Billing Management
        </h1>

        <p>
          Manage subscriptions,
          invoices and payments.
        </p>

      </div>

      {/* ==========================
          STATS
      ========================== */}

      <div className="stats-grid">

        <div className="stat-card">

          <h3>
            Total Invoices
          </h3>

          <h2>
            {totalInvoices}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Total Revenue
          </h3>

          <h2>
            ₹{totalRevenue}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Paid
          </h3>

          <h2>
            {paidInvoices}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Pending
          </h3>

          <h2>
            {pendingInvoices}
          </h2>

        </div>

      </div>

      {/* ==========================
          BILLING FORM
      ========================== */}

      <div className="billing-form-card">

        <h2>

          {editingId
            ? "Update Billing"
            : "Add Billing"}

        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="form-grid">

            {/* PLAN */}

            <select
              name="plan_name"
              value={
                formData.plan_name
              }
              onChange={
                handleChange
              }
            >

              <option>
                Free
              </option>

              <option>
                Starter
              </option>

              <option>
                Pro
              </option>

              <option>
                Business
              </option>

              <option>
                Enterprise
              </option>

            </select>

            {/* AMOUNT */}

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={
                formData.amount
              }
              onChange={
                handleChange
              }
              required
            />

            {/* BILLING CYCLE */}

            <select
              name="billing_cycle"
              value={
                formData.billing_cycle
              }
              onChange={
                handleChange
              }
            >

              <option>
                Monthly
              </option>

              <option>
                Quarterly
              </option>

              <option>
                Yearly
              </option>

            </select>

            {/* PAYMENT METHOD */}

            <select
              name="payment_method"
              value={
                formData.payment_method
              }
              onChange={
                handleChange
              }
            >

              <option>
                UPI
              </option>

              <option>
                Credit Card
              </option>

              <option>
                Debit Card
              </option>

              <option>
                Net Banking
              </option>

              <option>
                PayPal
              </option>

              <option>
                Razorpay
              </option>

            </select>

            {/* STATUS */}

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
            >

              <option>
                Pending
              </option>

              <option>
                Paid
              </option>

              <option>
                Failed
              </option>

              <option>
                Refunded
              </option>

              <option>
                Cancelled
              </option>

            </select>

            {/* BILLING DATE */}

            <input
              type="date"
              name="billing_date"
              value={
                formData.billing_date
              }
              onChange={
                handleChange
              }
            />

            {/* NEXT BILLING */}

            <input
              type="date"
              name="next_billing_date"
              value={
                formData.next_billing_date
              }
              onChange={
                handleChange
              }
            />

            {/* TRANSACTION ID */}

            <input
              type="text"
              name="transaction_id"
              placeholder="Transaction ID"
              value={
                formData.transaction_id
              }
              onChange={
                handleChange
              }
            />

          </div>

          <textarea
            rows="4"
            name="notes"
            placeholder="Billing Notes"
            value={
              formData.notes
            }
            onChange={
              handleChange
            }
          />

          <button
            type="submit"
            className="save-btn"
          >

            {editingId
              ? "Update Billing"
              : "Add Billing"}

          </button>

        </form>

      </div>
            {/* ==========================
          SEARCH
      ========================== */}

      <div className="search-card">

        <input
          type="text"
          placeholder="Search billing..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="search-input"
        />

      </div>

      {/* ==========================
          BILLING TABLE
      ========================== */}

      <div className="table-card">

        <table className="billing-table">

          <thead>

            <tr>

              <th>
                Plan
              </th>

              <th>
                Amount
              </th>

              <th>
                Cycle
              </th>

              <th>
                Payment
              </th>

              <th>
                Status
              </th>

              <th>
                Billing Date
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredBilling.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign:
                      "center",
                  }}
                >

                  No billing records found

                </td>

              </tr>

            ) : (

              filteredBilling.map(
                (bill) => (

                  <tr
                    key={bill.id}
                  >

                    <td>
                      {bill.plan_name}
                    </td>

                    <td>
                      ₹{bill.amount}
                    </td>

                    <td>
                      {bill.billing_cycle}
                    </td>

                    <td>
                      {bill.payment_method}
                    </td>

                    <td>

                      <span
                        className={`status-badge status-${bill.status?.toLowerCase()}`}
                      >

                        {bill.status}

                      </span>

                    </td>

                    <td>
                      {bill.billing_date}
                    </td>

                    <td
                      className="action-buttons"
                    >

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(
                            bill
                          )
                        }
                      >

                        Edit

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            bill.id
                          )
                        }
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                )

              )

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Billing;
import { supabase } from "./supabase";

/* =========================
   GET ALL BILLING RECORDS
========================= */

export const getBillingRecords =
  async () => {

    const { data, error } =
      await supabase
        .from("billing")
        .select("*")
        .order(
          "billing_date",
          {
            ascending: false,
          }
        );

    return {
      data,
      error,
    };

  };

/* =========================
   GET BILLING BY ID
========================= */

export const getBillingById =
  async (id) => {

    const { data, error } =
      await supabase
        .from("billing")
        .select("*")
        .eq("id", id)
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   CREATE BILLING
========================= */

export const createBilling =
  async (billing) => {

    const { data, error } =
      await supabase
        .from("billing")
        .insert([
          billing,
        ])
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   UPDATE BILLING
========================= */

export const updateBilling =
  async (
    id,
    billing
  ) => {

    const { data, error } =
      await supabase
        .from("billing")
        .update(billing)
        .eq("id", id)
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   DELETE BILLING
========================= */

export const deleteBilling =
  async (id) => {

    const { error } =
      await supabase
        .from("billing")
        .delete()
        .eq("id", id);

    return {
      error,
    };

  };

/* =========================
   SEARCH BILLING
========================= */

export const searchBilling =
  async (keyword) => {

    const { data, error } =
      await supabase
        .from("billing")
        .select("*")
        .or(
          `plan_name.ilike.%${keyword}%,
           status.ilike.%${keyword}%,
           transaction_id.ilike.%${keyword}%`
        );

    return {
      data,
      error,
    };

  };

/* =========================
   GET PAID BILLING
========================= */

export const getPaidBilling =
  async () => {

    const { data, error } =
      await supabase
        .from("billing")
        .select("*")
        .eq(
          "status",
          "Paid"
        );

    return {
      data,
      error,
    };

  };

/* =========================
   GET PENDING BILLING
========================= */

export const getPendingBilling =
  async () => {

    const { data, error } =
      await supabase
        .from("billing")
        .select("*")
        .eq(
          "status",
          "Pending"
        );

    return {
      data,
      error,
    };

  };

/* =========================
   BILLING STATS
========================= */

export const getBillingStats =
  async () => {

    const { data, error } =
      await supabase
        .from("billing")
        .select("*");

    if (
      error ||
      !data
    ) {

      return {

        totalInvoices: 0,
        totalRevenue: 0,
        paid: 0,
        pending: 0,

      };

    }

    return {

      totalInvoices:
        data.length,

      totalRevenue:
        data.reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item.amount || 0
            ),
          0
        ),

      paid:
        data.filter(
          item =>
            item.status ===
            "Paid"
        ).length,

      pending:
        data.filter(
          item =>
            item.status ===
            "Pending"
        ).length,

    };

  };
import { supabase } from "./supabase";

/* =========================
   GET ALL FOLLOWUPS
========================= */

export const getFollowUps =
  async () => {

    const { data, error } =
      await supabase
        .from("followups")
        .select("*")
        .order(
          "due_date",
          {
            ascending: true,
          }
        );

    return {
      data,
      error,
    };

  };

/* =========================
   GET FOLLOWUP BY ID
========================= */

export const getFollowUpById =
  async (id) => {

    const { data, error } =
      await supabase
        .from("followups")
        .select("*")
        .eq("id", id)
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   CREATE FOLLOWUP
========================= */

export const createFollowUp =
  async (followup) => {

    const { data, error } =
      await supabase
        .from("followups")
        .insert([
          followup,
        ])
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   UPDATE FOLLOWUP
========================= */

export const updateFollowUp =
  async (
    id,
    followup
  ) => {

    const { data, error } =
      await supabase
        .from("followups")
        .update(
          followup
        )
        .eq("id", id)
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   DELETE FOLLOWUP
========================= */

export const deleteFollowUp =
  async (id) => {

    const { error } =
      await supabase
        .from("followups")
        .delete()
        .eq("id", id);

    return {
      error,
    };

  };

/* =========================
   SEARCH FOLLOWUPS
========================= */

export const searchFollowUps =
  async (keyword) => {

    const { data, error } =
      await supabase
        .from("followups")
        .select("*")
        .or(
          `title.ilike.%${keyword}%,
           notes.ilike.%${keyword}%`
        );

    return {
      data,
      error,
    };

  };

/* =========================
   FILTER BY STATUS
========================= */

export const getFollowUpsByStatus =
  async (status) => {

    const { data, error } =
      await supabase
        .from("followups")
        .select("*")
        .eq(
          "status",
          status
        );

    return {
      data,
      error,
    };

  };

/* =========================
   FILTER BY PRIORITY
========================= */

export const getFollowUpsByPriority =
  async (priority) => {

    const { data, error } =
      await supabase
        .from("followups")
        .select("*")
        .eq(
          "priority",
          priority
        );

    return {
      data,
      error,
    };

  };

/* =========================
   UPCOMING FOLLOWUPS
========================= */

export const getUpcomingFollowUps =
  async () => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const { data, error } =
      await supabase
        .from("followups")
        .select("*")
        .gte(
          "due_date",
          today
        )
        .order(
          "due_date",
          {
            ascending: true,
          }
        );

    return {
      data,
      error,
    };

  };

/* =========================
   FOLLOWUP STATS
========================= */

export const getFollowUpStats =
  async () => {

    const { data, error } =
      await supabase
        .from("followups")
        .select("*");

    if (
      error ||
      !data
    ) {

      return {

        totalFollowUps: 0,
        pending: 0,
        completed: 0,
        urgent: 0,

      };

    }

    return {

      totalFollowUps:
        data.length,

      pending:
        data.filter(
          item =>
            item.status ===
            "Pending"
        ).length,

      completed:
        data.filter(
          item =>
            item.status ===
            "Completed"
        ).length,

      urgent:
        data.filter(
          item =>
            item.priority ===
            "Urgent"
        ).length,

    };

  };
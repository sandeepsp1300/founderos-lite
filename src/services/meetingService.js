import { supabase } from "./supabase";

/* =========================
   GET ALL MEETINGS
========================= */

export const getMeetings = async () => {

  const { data, error } =
    await supabase
      .from("meetings")
      .select("*")
      .order(
        "meeting_date",
        { ascending: true }
      );

  return { data, error };

};

/* =========================
   GET SINGLE MEETING
========================= */

export const getMeetingById =
  async (id) => {

    const { data, error } =
      await supabase
        .from("meetings")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

  };

/* =========================
   GET MEETINGS BY INVESTOR
========================= */

export const getMeetingsByInvestor =
  async (investorId) => {

    const { data, error } =
      await supabase
        .from("meetings")
        .select("*")
        .eq(
          "investor_id",
          investorId
        )
        .order(
          "meeting_date",
          {
            ascending: true,
          }
        );

    return { data, error };

  };

/* =========================
   CREATE MEETING
========================= */

export const createMeeting =
  async (meeting) => {

    const { data, error } =
      await supabase
        .from("meetings")
        .insert([meeting])
        .select()
        .single();

    return { data, error };

  };

/* =========================
   UPDATE MEETING
========================= */

export const updateMeeting =
  async (
    id,
    meeting
  ) => {

    const { data, error } =
      await supabase
        .from("meetings")
        .update(meeting)
        .eq("id", id)
        .select()
        .single();

    return { data, error };

  };

/* =========================
   DELETE MEETING
========================= */

export const deleteMeeting =
  async (id) => {

    const { error } =
      await supabase
        .from("meetings")
        .delete()
        .eq("id", id);

    return { error };

  };

/* =========================
   SEARCH MEETINGS
========================= */

export const searchMeetings =
  async (keyword) => {

    const { data, error } =
      await supabase
        .from("meetings")
        .select("*")
        .or(
          `title.ilike.%${keyword}%,
           notes.ilike.%${keyword}%`
        );

    return { data, error };

  };

/* =========================
   UPCOMING MEETINGS
========================= */

export const getUpcomingMeetings =
  async () => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const { data, error } =
      await supabase
        .from("meetings")
        .select("*")
        .gte(
          "meeting_date",
          today
        )
        .order(
          "meeting_date",
          {
            ascending: true,
          }
        );

    return { data, error };

  };

/* =========================
   COMPLETED MEETINGS
========================= */

export const getCompletedMeetings =
  async () => {

    const { data, error } =
      await supabase
        .from("meetings")
        .select("*")
        .eq(
          "status",
          "Completed"
        );

    return { data, error };

  };

/* =========================
   CANCELLED MEETINGS
========================= */

export const getCancelledMeetings =
  async () => {

    const { data, error } =
      await supabase
        .from("meetings")
        .select("*")
        .eq(
          "status",
          "Cancelled"
        );

    return { data, error };

  };

/* =========================
   MEETING STATS
========================= */

export const getMeetingStats =
  async () => {

    const { data, error } =
      await supabase
        .from("meetings")
        .select("*");

    if (error || !data) {

      return {

        totalMeetings: 0,
        upcoming: 0,
        completed: 0,
        cancelled: 0,

      };

    }

    return {

      totalMeetings:
        data.length,

      upcoming:
        data.filter(
          meeting =>
            meeting.status ===
            "Upcoming"
        ).length,

      completed:
        data.filter(
          meeting =>
            meeting.status ===
            "Completed"
        ).length,

      cancelled:
        data.filter(
          meeting =>
            meeting.status ===
            "Cancelled"
        ).length,

    };

  };

  /* =========================
   FILTER BY STATUS
========================= */

export const getMeetingsByStatus =
  async (status) => {

    const { data, error } =
      await supabase
        .from("meetings")
        .select("*")
        .eq("status", status);

    return { data, error };

  };

/* =========================
   FILTER BY PRIORITY
========================= */

export const getMeetingsByPriority =
  async (priority) => {

    const { data, error } =
      await supabase
        .from("meetings")
        .select("*")
        .eq(
          "priority",
          priority
        );

    return { data, error };

  };
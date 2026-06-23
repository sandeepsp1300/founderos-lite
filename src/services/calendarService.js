import { supabase } from "./supabase";

/* =========================================
   MANUAL CALENDAR EVENTS CRUD
========================================= */

export const getEvents =
  async () => {

    const { data, error } =
      await supabase
        .from("calendar_events")
        .select("*")
        .order(
          "start_date",
          {
            ascending: true,
          }
        );

    return {
      data,
      error,
    };

  };

export const getEventById =
  async (id) => {

    const { data, error } =
      await supabase
        .from("calendar_events")
        .select("*")
        .eq("id", id)
        .single();

    return {
      data,
      error,
    };

  };

export const createEvent =
  async (event) => {

    const { data, error } =
      await supabase
        .from("calendar_events")
        .insert([
          event,
        ])
        .select()
        .single();

    return {
      data,
      error,
    };

  };

export const updateEvent =
  async (
    id,
    event
  ) => {

    const { data, error } =
      await supabase
        .from("calendar_events")
        .update({

          ...event,

          updated_at:
            new Date()
              .toISOString(),

        })
        .eq("id", id)
        .select()
        .single();

    return {
      data,
      error,
    };

  };

export const deleteEvent =
  async (id) => {

    const { error } =
      await supabase
        .from("calendar_events")
        .delete()
        .eq("id", id);

    return {
      error,
    };

  };

/* =========================================
   CRM CALENDAR VIEW
   Meetings + Tasks + FollowUps
   + Billing + Calendar Events
========================================= */

export const getCRMCalendar =
  async () => {

    const { data, error } =
      await supabase
        .from(
          "crm_calendar_view"
        )
        .select("*")
        .order(
          "event_date",
          {
            ascending: true,
          }
        );

    return {
      data,
      error,
    };

  };

/* =========================================
   TODAY EVENTS
========================================= */

export const getTodayEvents =
  async () => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const tomorrow =
      new Date(
        Date.now() +
        86400000
      )
        .toISOString()
        .split("T")[0];

    const { data, error } =
      await supabase
        .from(
          "crm_calendar_view"
        )
        .select("*")
        .gte(
          "event_date",
          today
        )
        .lt(
          "event_date",
          tomorrow
        );

    return {
      data,
      error,
    };

  };

/* =========================================
   UPCOMING EVENTS
========================================= */

export const getUpcomingEvents =
  async () => {

    const now =
      new Date()
        .toISOString();

    const { data, error } =
      await supabase
        .from(
          "crm_calendar_view"
        )
        .select("*")
        .gte(
          "event_date",
          now
        )
        .order(
          "event_date",
          {
            ascending: true,
          }
        );

    return {
      data,
      error,
    };

  };

/* =========================================
   SEARCH
========================================= */

export const searchCalendar =
  async (
    keyword
  ) => {

    const { data, error } =
      await supabase
        .from(
          "crm_calendar_view"
        )
        .select("*")
        .ilike(
          "title",
          `%${keyword}%`
        );

    return {
      data,
      error,
    };

  };

/* =========================================
   FILTER BY SOURCE
========================================= */

export const getBySource =
  async (
    source
  ) => {

    const { data, error } =
      await supabase
        .from(
          "crm_calendar_view"
        )
        .select("*")
        .eq(
          "source",
          source
        );

    return {
      data,
      error,
    };

  };

/* =========================================
   CALENDAR STATS
========================================= */

export const getCalendarStats =
  async () => {

    const { data, error } =
      await supabase
        .from(
          "crm_calendar_view"
        )
        .select("*");

    if (
      error ||
      !data
    ) {

      return {

        totalEvents: 0,

        meetings: 0,

        tasks: 0,

        followups: 0,

        billing: 0,

        calendarEvents: 0,

      };

    }

    return {

      totalEvents:
        data.length,

      meetings:
        data.filter(
          item =>
            item.source ===
            "Meeting"
        ).length,

      tasks:
        data.filter(
          item =>
            item.source ===
            "Task"
        ).length,

      followups:
        data.filter(
          item =>
            item.source ===
            "FollowUp"
        ).length,

      billing:
        data.filter(
          item =>
            item.source ===
            "Billing"
        ).length,

      calendarEvents:
        data.filter(
          item =>
            item.source ===
            "Calendar Event"
        ).length,

    };

  };
import { supabase } from "./supabase";

/* =========================
   GET ALL TASKS
========================= */

export const getTasks =
  async () => {

    const { data, error } =
      await supabase
        .from("tasks")
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
   GET TASK BY ID
========================= */

export const getTaskById =
  async (id) => {

    const { data, error } =
      await supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   CREATE TASK
========================= */

export const createTask =
  async (task) => {

    const { data, error } =
      await supabase
        .from("tasks")
        .insert([task])
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   UPDATE TASK
========================= */

export const updateTask =
  async (
    id,
    task
  ) => {

    const { data, error } =
      await supabase
        .from("tasks")
        .update(task)
        .eq("id", id)
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   DELETE TASK
========================= */

export const deleteTask =
  async (id) => {

    const { error } =
      await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

    return {
      error,
    };

  };

/* =========================
   SEARCH TASKS
========================= */

export const searchTasks =
  async (keyword) => {

    const { data, error } =
      await supabase
        .from("tasks")
        .select("*")
        .or(
          `title.ilike.%${keyword}%,
           description.ilike.%${keyword}%`
        );

    return {
      data,
      error,
    };

  };

/* =========================
   FILTER BY STATUS
========================= */

export const getTasksByStatus =
  async (status) => {

    const { data, error } =
      await supabase
        .from("tasks")
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

export const getTasksByPriority =
  async (priority) => {

    const { data, error } =
      await supabase
        .from("tasks")
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
   PENDING TASKS
========================= */

export const getPendingTasks =
  async () => {

    const { data, error } =
      await supabase
        .from("tasks")
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
   COMPLETED TASKS
========================= */

export const getCompletedTasks =
  async () => {

    const { data, error } =
      await supabase
        .from("tasks")
        .select("*")
        .eq(
          "status",
          "Completed"
        );

    return {
      data,
      error,
    };

  };

/* =========================
   TASK STATS
========================= */

export const getTaskStats =
  async () => {

    const { data, error } =
      await supabase
        .from("tasks")
        .select("*");

    if (
      error ||
      !data
    ) {

      return {

        totalTasks: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        urgent: 0,

      };

    }

    return {

      totalTasks:
        data.length,

      pending:
        data.filter(
          task =>
            task.status ===
            "Pending"
        ).length,

      inProgress:
        data.filter(
          task =>
            task.status ===
            "In Progress"
        ).length,

      completed:
        data.filter(
          task =>
            task.status ===
            "Completed"
        ).length,

      urgent:
        data.filter(
          task =>
            task.priority ===
            "Urgent"
        ).length,

    };

  };
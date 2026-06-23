import { supabase } from "./supabase";

/* =========================
   GET ALL TEAM MEMBERS
========================= */

export const getTeamMembers =
  async () => {

    const { data, error } =
      await supabase
        .from("team_members")
        .select("*")
        .order(
          "created_at",
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
   GET TEAM MEMBER BY ID
========================= */

export const getTeamMemberById =
  async (id) => {

    const { data, error } =
      await supabase
        .from("team_members")
        .select("*")
        .eq("id", id)
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   CREATE TEAM MEMBER
========================= */

export const createTeamMember =
  async (member) => {

    const { data, error } =
      await supabase
        .from("team_members")
        .insert([
          member,
        ])
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   UPDATE TEAM MEMBER
========================= */

export const updateTeamMember =
  async (
    id,
    member
  ) => {

    const { data, error } =
      await supabase
        .from("team_members")
        .update(member)
        .eq("id", id)
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   DELETE TEAM MEMBER
========================= */

export const deleteTeamMember =
  async (id) => {

    const { error } =
      await supabase
        .from("team_members")
        .delete()
        .eq("id", id);

    return {
      error,
    };

  };

/* =========================
   SEARCH TEAM MEMBERS
========================= */

export const searchTeamMembers =
  async (keyword) => {

    const { data, error } =
      await supabase
        .from("team_members")
        .select("*")
        .or(
          `name.ilike.%${keyword}%,
           email.ilike.%${keyword}%,
           role.ilike.%${keyword}%,
           department.ilike.%${keyword}%`
        );

    return {
      data,
      error,
    };

  };

/* =========================
   FILTER BY DEPARTMENT
========================= */

export const getTeamByDepartment =
  async (department) => {

    const { data, error } =
      await supabase
        .from("team_members")
        .select("*")
        .eq(
          "department",
          department
        );

    return {
      data,
      error,
    };

  };

/* =========================
   FILTER BY STATUS
========================= */

export const getTeamByStatus =
  async (status) => {

    const { data, error } =
      await supabase
        .from("team_members")
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
   TEAM STATS
========================= */

export const getTeamStats =
  async () => {

    const { data, error } =
      await supabase
        .from("team_members")
        .select("*");

    if (
      error ||
      !data
    ) {

      return {

        totalMembers: 0,
        active: 0,
        onLeave: 0,
        inactive: 0,

      };

    }

    return {

      totalMembers:
        data.length,

      active:
        data.filter(
          member =>
            member.status ===
            "Active"
        ).length,

      onLeave:
        data.filter(
          member =>
            member.status ===
            "On Leave"
        ).length,

      inactive:
        data.filter(
          member =>
            member.status ===
            "Inactive"
        ).length,

    };

  };
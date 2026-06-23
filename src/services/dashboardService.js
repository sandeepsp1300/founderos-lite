import { supabase } from "./supabase";

export const getDashboardStats =
async () => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const userId = user.id;

  const [
    investors,
    meetings,
    tasks,
    documents,
    followups,
    team,
  ] = await Promise.all([

    supabase
      .from("investors")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId),

    supabase
      .from("meetings")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId),

    supabase
      .from("tasks")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId),

    supabase
      .from("documents")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId),

    supabase
      .from("followups")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId),

    supabase
      .from("team_members")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId),

  ]);

  return {

    investors:
      investors.count || 0,

    meetings:
      meetings.count || 0,

    tasks:
      tasks.count || 0,

    documents:
      documents.count || 0,

    followups:
      followups.count || 0,

    team:
      team.count || 0,

  };

};

export const getRecentInvestors =
async () => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } =
    await supabase
      .from("investors")
      .select("*")
      .eq("user_id", user.id)
      .order(
        "created_at",
        {
          ascending: false,
        }
      )
      .limit(5);

  return data || [];

};

export const getUpcomingMeetings =
async () => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } =
    await supabase
      .from("meetings")
      .select("*")
      .eq("user_id", user.id)
      .order(
        "meeting_date",
        {
          ascending: true,
        }
      )
      .limit(5);

  return data || [];

};

export const getRecentTasks =
async () => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } =
    await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order(
        "created_at",
        {
          ascending: false,
        }
      )
      .limit(5);

  return data || [];

};
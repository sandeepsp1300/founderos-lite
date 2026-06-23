import { supabase } from "./supabase";

/* =========================
   GET SETTINGS
========================= */

export const getSettings =
  async () => {

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user)
      return {
        data: null,
        error: "User not found",
      };

    const { data, error } =
      await supabase
        .from("settings")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   CREATE SETTINGS
========================= */

export const createSettings =
  async (settings) => {

    const { data, error } =
      await supabase
        .from("settings")
        .insert([
          settings,
        ])
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   UPDATE SETTINGS
========================= */

export const updateSettings =
  async (
    id,
    settings
  ) => {

    const { data, error } =
      await supabase
        .from("settings")
        .update({

          ...settings,

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

/* =========================
   UPSERT SETTINGS
========================= */

export const saveSettings =
  async (settings) => {

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {

      return {
        error:
          "User not found",
      };

    }

    const existing =
      await supabase
        .from("settings")
        .select("id")
        .eq(
          "user_id",
          user.id
        )
        .single();

    if (
      existing.data
    ) {

      return updateSettings(
        existing.data.id,
        settings
      );

    }

    return createSettings({

      ...settings,

      user_id:
        user.id,

    });

  };

/* =========================
   UPLOAD LOGO
========================= */

export const uploadLogo =
  async (file) => {

    if (!file)
      return {
        error:
          "No file selected",
      };

    const fileName =
      `logo-${Date.now()}-${file.name}`;

    const { error } =
      await supabase.storage
        .from("company-assets")
        .upload(
          fileName,
          file
        );

    if (error) {

      return {
        error,
      };

    }

    const { data } =
      supabase.storage
        .from("company-assets")
        .getPublicUrl(
          fileName
        );

    return {

      logoUrl:
        data.publicUrl,

    };

  };

/* =========================
   DELETE LOGO
========================= */

export const deleteLogo =
  async (
    logoUrl
  ) => {

    if (!logoUrl)
      return;

    const path =
      logoUrl
        .split(
          "/company-assets/"
        )[1];

    if (!path)
      return;

    return supabase.storage
      .from(
        "company-assets"
      )
      .remove([
        path,
      ]);

  };

/* =========================
   RESET SETTINGS
========================= */

export const resetSettings =
  async () => {

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user)
      return;

    return supabase
      .from("settings")
      .update({

        company_name: "",

        company_email: "",

        company_phone: "",

        website: "",

        industry: "",

        startup_stage: "",

        founded_year: "",

        company_size: "",

        company_address: "",

        company_description: "",

        currency: "INR",

        timezone:
          "Asia/Kolkata",

        theme:
          "Light",

        notifications_enabled:
          true,

        email_notifications:
          true,

        meeting_reminders:
          true,

        task_reminders:
          true,

      })
      .eq(
        "user_id",
        user.id
      );

  };

/* =========================
   GET BILLING SUMMARY
========================= */

export const getBillingSummary =
  async () => {

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user)
      return {
        data: null,
      };

    const { data, error } =
      await supabase
        .from("billing")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .limit(1)
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   EXPORT ALL DATA
========================= */

export const exportWorkspaceData =
  async () => {

    const tables = [

      "investors",

      "meetings",

      "tasks",

      "followups",

      "team_members",

      "documents",

      "billing",

    ];

    const exportData =
      {};

    for (
      const table
      of tables
    ) {

      const {
        data,
      } =
        await supabase
          .from(table)
          .select("*");

      exportData[
        table
      ] =
        data || [];

    }

    return exportData;

  };
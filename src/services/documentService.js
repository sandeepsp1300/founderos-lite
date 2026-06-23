import { supabase } from "./supabase";

/* =========================
   GET ALL DOCUMENTS
========================= */

export const getDocuments =
  async () => {

    const { data, error } =
      await supabase
        .from("documents")
        .select("*")
        .order(
          "uploaded_at",
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
   GET DOCUMENT BY ID
========================= */

export const getDocumentById =
  async (id) => {

    const { data, error } =
      await supabase
        .from("documents")
        .select("*")
        .eq("id", id)
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   CREATE DOCUMENT
========================= */

export const createDocument =
  async (document) => {

    const { data, error } =
      await supabase
        .from("documents")
        .insert([
          document,
        ])
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   UPDATE DOCUMENT
========================= */

export const updateDocument =
  async (
    id,
    document
  ) => {

    const { data, error } =
      await supabase
        .from("documents")
        .update(document)
        .eq("id", id)
        .select()
        .single();

    return {
      data,
      error,
    };

  };

/* =========================
   DELETE DOCUMENT
========================= */

export const deleteDocument =
  async (id) => {

    const { error } =
      await supabase
        .from("documents")
        .delete()
        .eq("id", id);

    return {
      error,
    };

  };

/* =========================
   SEARCH DOCUMENTS
========================= */

export const searchDocuments =
  async (keyword) => {

    const { data, error } =
      await supabase
        .from("documents")
        .select("*")
        .or(
          `file_name.ilike.%${keyword}%,
           category.ilike.%${keyword}%,
           description.ilike.%${keyword}%`
        );

    return {
      data,
      error,
    };

  };

/* =========================
   DOCUMENTS BY CATEGORY
========================= */

export const getDocumentsByCategory =
  async (category) => {

    const { data, error } =
      await supabase
        .from("documents")
        .select("*")
        .eq(
          "category",
          category
        );

    return {
      data,
      error,
    };

  };

/* =========================
   DOCUMENTS BY INVESTOR
========================= */

export const getDocumentsByInvestor =
  async (investorId) => {

    const { data, error } =
      await supabase
        .from("documents")
        .select("*")
        .eq(
          "investor_id",
          investorId
        );

    return {
      data,
      error,
    };

  };

/* =========================
   DOCUMENT STATS
========================= */

export const getDocumentStats =
  async () => {

    const { data, error } =
      await supabase
        .from("documents")
        .select("*");

    if (
      error ||
      !data
    ) {

      return {

        totalDocuments: 0,
        active: 0,
        archived: 0,

      };

    }

    return {

      totalDocuments:
        data.length,

      active:
        data.filter(
          doc =>
            doc.status ===
            "Active"
        ).length,

      archived:
        data.filter(
          doc =>
            doc.status ===
            "Archived"
        ).length,

    };

  };
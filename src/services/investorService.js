import { supabase } from "./supabase";

/* ==========================
GET ALL INVESTORS
========================== */

export const getInvestors =
async () => {


const { data, error } =
  await supabase
    .from("investors")
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

/* ==========================
GET INVESTOR BY ID
========================== */

export const getInvestorById =
async (id) => {


const { data, error } =
  await supabase
    .from("investors")
    .select("*")
    .eq("id", id)
    .single();

return {
  data,
  error,
};


};

/* ==========================
CREATE INVESTOR
========================== */

export const createInvestor =
async (investor) => {


const { data, error } =
  await supabase
    .from("investors")
    .insert([
      investor,
    ])
    .select()
    .single();

return {
  data,
  error,
};


};

/* ==========================
UPDATE INVESTOR
========================== */

export const updateInvestor =
async (
id,
investor
) => {


const { data, error } =
  await supabase
    .from("investors")
    .update(
      investor
    )
    .eq("id", id)
    .select()
    .single();

return {
  data,
  error,
};


};

/* ==========================
DELETE INVESTOR
========================== */

export const deleteInvestor =
async (id) => {


const { error } =
  await supabase
    .from("investors")
    .delete()
    .eq("id", id);

return {
  error,
};


};

/* ==========================
SEARCH INVESTORS
========================== */

export const searchInvestors =
async (keyword) => {


const { data, error } =
  await supabase
    .from("investors")
    .select("*")
    .or(

      `name.ilike.%${keyword}%,
       email.ilike.%${keyword}%,
       phone.ilike.%${keyword}%`

    )
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

/* ==========================
FILTER BY STAGE
========================== */

export const getInvestorsByStage =
async (stage) => {


const { data, error } =
  await supabase
    .from("investors")
    .select("*")
    .eq(
      "stage",
      stage
    );

return {
  data,
  error,
};


};

/* ==========================
INVESTOR STATS
========================== */

export const getInvestorStats =
async () => {


const { data, error } =
  await supabase
    .from("investors")
    .select("*");

if (
  error ||
  !data
) {

  return {

    totalInvestors: 0,

    interested: 0,

    invested: 0,

    totalFunding: 0,

  };

}

const totalInvestors =
  data.length;

const interested =
  data.filter(
    (item) =>
      item.stage ===
      "Interested"
  ).length;

const invested =
  data.filter(
    (item) =>
      item.stage ===
      "Invested"
  ).length;

const totalFunding =
  data.reduce(

    (
      sum,
      investor
    ) =>

      sum +

      Number(
        investor.investment_amount || 0
      ),

    0

  );

return {

  totalInvestors,

  interested,

  invested,

  totalFunding,

};


};

/* ==========================
PIPELINE DATA
========================== */

export const getPipelineStats =
async () => {


const { data } =
  await supabase
    .from("investors")
    .select("stage");

const pipeline = {

  Lead: 0,

  Contacted: 0,

  Interested: 0,

  Meeting: 0,

  Invested: 0,

  Rejected: 0,

};

data?.forEach(
  (item) => {

    if (
      pipeline[
        item.stage
      ] !== undefined
    ) {

      pipeline[
        item.stage
      ]++;

    }

  }
);

return pipeline;


};

import { supabase } from "./supabase";

/* GET PROFILE */

export const getProfile =
async (userId) => {


const { data, error } =
  await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

return {
  data,
  error,
};


};

/* CREATE OR UPDATE PROFILE */

export const saveProfile =
async (
userId,
profile
) => {


const payload = {

  id: userId,

  ...profile,

  updated_at:
    new Date()
      .toISOString(),

};

const { data, error } = await supabase
  .from("profiles")
  .upsert(payload)
  .select()
  .maybeSingle();

return {
  data,
  error,
};


};

/* UPDATE PROFILE */

export const updateProfile =
async (
userId,
profile
) => {


const { data, error } = await supabase
  .from("profiles")
  .update({
    ...profile,
    updated_at: new Date().toISOString(),
  })
  .eq("id", userId)
  .select()
  .maybeSingle();

return {
  data,
  error,
};


};

/* PROFILE COMPLETION */

export const getProfileCompletion =
(profile) => {


if (!profile)
  return 0;

const fields = [

  profile.full_name,

  profile.email,

  profile.startup_name,

  profile.industry,

  profile.startup_stage,

  profile.website,

  profile.linkedin,

  profile.location,

  profile.team_size,

  profile.funding_goal,

  profile.description,

];

const completed =
  fields.filter(
    (field) =>

      field !== null &&
      field !== "" &&
      field !== undefined

  ).length;

return Math.round(
  (
    completed /
    fields.length
  ) * 100
);


};

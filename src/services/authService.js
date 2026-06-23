import { supabase } from "./supabase";




/* ==========================
   REGISTER USER
========================== */
export const registerUser = async (
  email,
  password
) => {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  return { data, error };
};

/* ==========================
   LOGIN USER
========================== */
export const loginUser = async (
  email,
  password
) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  return { data, error };
};

/* ==========================
   LOGOUT USER
========================== */
export const logoutUser = async () => {
  const { error } =
    await supabase.auth.signOut();

  return { error };
};

/* ==========================
   GET CURRENT USER
========================== */
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
};

/* ==========================
   GET CURRENT SESSION
========================== */
export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return { session, error };
};

/* ==========================
   FORGOT PASSWORD
========================== */

export const resetPassword = async (
  email
) => {

  const { data, error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          "http://localhost:5173/reset-password",
      }
    );

  return { data, error };
};

/* ==========================
   UPDATE PASSWORD
========================== */
export const updatePassword = async (
  password
) => {
  const { data, error } =
    await supabase.auth.updateUser({
      password,
    });

  return { data, error };
};

/* ==========================
   RESEND EMAIL VERIFICATION
========================== */
export const resendVerification =
  async (email) => {
    const { data, error } =
      await supabase.auth.resend({
        type: "signup",
        email,
      });

    return { data, error };
  };

/* ==========================
   LISTEN AUTH CHANGES
========================== */
export const authListener = (
  callback
) => {
  return supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session);
    }
  );
};

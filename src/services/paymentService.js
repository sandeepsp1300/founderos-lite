
import { supabase } from "./supabase";

/* ==========================
   SAVE PAYMENT
========================== */

export const createPayment = async ({
  userId,
  planId,
  amount,
  paymentId,
  status = "success",
}) => {

  const { data, error } =
    await supabase
      .from("payments")
      .insert([
        {
          user_id: userId,
          plan_id: planId,
          amount,
          payment_id: paymentId,
          status,
        },
      ])
      .select()
      .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

/* ==========================
   GET USER PAYMENTS
========================== */

export const getUserPayments =
  async (userId) => {

    const { data, error } =
      await supabase
        .from("payments")
        .select("*")
        .eq("user_id", userId)
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  };

/* ==========================
   GET PAYMENT BY ID
========================== */

export const getPaymentById =
  async (paymentId) => {

    const { data, error } =
      await supabase
        .from("payments")
        .select("*")
        .eq(
          "payment_id",
          paymentId
        )
        .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  };
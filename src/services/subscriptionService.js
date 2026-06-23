// src/services/subscriptionService.js

import { supabase } from "./supabase";

/* ==========================
   GET ALL ACTIVE PLANS
========================== */

export const getPlans = async () => {

  const { data, error } =
    await supabase
      .from("plans")
      .select("*")
      .eq("is_active", true)
      .order("price", {
        ascending: true,
      });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

/* ==========================
   GET USER SUBSCRIPTION
========================== */

export const getSubscription =
  async (userId) => {

    const { data, error } =
      await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  };

/* ==========================
   CREATE SUBSCRIPTION
========================== */

export const createSubscription =
  async (
    userId,
    planId,
    planName,
    startDate,
    endDate
  ) => {

    const { data, error } =
      await supabase
        .from("subscriptions")
        .insert([
          {
            user_id: userId,
            plan_id: planId,
            plan_name: planName,
            status: "active",
            start_date: startDate,
            end_date: endDate,
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
   UPDATE SUBSCRIPTION
========================== */

export const updateSubscription =
  async (
    subscriptionId,
    updates
  ) => {

    const { data, error } =
      await supabase
        .from("subscriptions")
        .update(updates)
        .eq("id", subscriptionId)
        .select()
        .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  };

/* ==========================
   CANCEL SUBSCRIPTION
========================== */

export const cancelSubscription =
  async (
    subscriptionId
  ) => {

    const { data, error } =
      await supabase
        .from("subscriptions")
        .update({
          status: "cancelled",
        })
        .eq("id", subscriptionId)
        .select()
        .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  };

/* ==========================
   CHECK TRIAL EXPIRED
========================== */

export const isTrialExpired =
  (subscription) => {

    if (!subscription)
      return true;

    if (
      !subscription.end_date
    )
      return true;

    const now =
      new Date();

    const endDate =
      new Date(
        subscription.end_date
      );

    return now > endDate;
  };

/* ==========================
   SAVE PAYMENT
========================== */

export const savePayment =
  async (
    paymentData
  ) => {

    const { data, error } =
      await supabase
        .from("payments")
        .insert([
          paymentData,
        ])
        .select()
        .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  };
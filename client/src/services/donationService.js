import AuthService from "./AuthService";

const api = AuthService.api;

/* ---------------------------------------------
   CREATE STRIPE CHECKOUT SESSION
--------------------------------------------- */
const createDonationSession = async (amount) => {
  const response = await api.post("/donations/create-session", {
    amount,
  });

  return response.data; 
  // Expected: { url: "stripe-checkout-url" }
};

/* ---------------------------------------------
   CONFIRM DONATION (AFTER PAYMENT SUCCESS)
--------------------------------------------- */
const confirmDonation = async (sessionId) => {
  const response = await api.post("/donations/confirm", {
    sessionId,
  });

  return response.data;
};

/* ---------------------------------------------
   GET USER DONATION HISTORY
--------------------------------------------- */
const getDonationHistory = async () => {
  const response = await api.get("/donations/history");
  return response.data;
};

/* ---------------------------------------------
   GET TOTAL DONATION AMOUNT
--------------------------------------------- */
const getTotalDonated = async () => {
  const response = await api.get("/donations/total");
  return response.data;
};

/* ---------------------------------------------
   TOGGLE DONATION BADGE VISIBILITY
--------------------------------------------- */
const toggleDonationBadge = async (showBadge) => {
  const response = await api.put("/donations/toggle-badge", {
    showBadge,
  });

  return response.data;
};

/* ---------------------------------------------
   EXPORT
--------------------------------------------- */
const donationService = {
  createDonationSession,
  confirmDonation,
  getDonationHistory,
  getTotalDonated,
  toggleDonationBadge,
};

export default donationService;

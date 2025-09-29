import api from "./api";

// Get all quotes
export const sendOTP = async (payload) => {
  payload = {
    ...payload,
    countryCode: "91",
    password: "password",
    userType: "INTERIOR",
    deviceId: "IPHONE15PLUS2024",
    deviceOSType: "IOS",
  };
  const response = await api.post("/auth/sendOtp", payload);
  return response.data;
};
export const validateOTP = async (payload) => {
  payload = {
    ...payload,
    countryCode: "91",
    password: "password",
    userType: "INTERIOR",
    deviceId: "IPHONE15PLUS2024",
    deviceOSType: "IOS",
  };
  const response = await api.post("/auth/validateOtp", payload);
  return response.data;
};
export const getQuotesListings = async (current, pageSize) => {
  const response = await api.get(`/listings?page=${current}&size=${pageSize}`);
  return response.data;
};

export const getQuoteByUserID = async (userId) => {
  const response = await api.get(`/quotes/user/${userId}`);
  return response.data;
};

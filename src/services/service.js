import api from "./api";

// Get all quotes
export const sendOTP = async (payload) => {
  payload = {
    // phoneNumber: "0000000701",
    ...payload,
    countryCode: "91",
    password: "password",
    userType: "HOMEOWNER",
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
    userType: "HOMEOWNER",
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

export const getQuoteByUserID = async () => {
  const response = await api.get(`/quotes/user/603`);
  return response.data;
};

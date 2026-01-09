import axiosInstance from "../../services/axiosInstance";

// Get current logged-in user (optional but recommended)
export const fetchCurrentUser = async () => {
  const response = await axiosInstance.get("/users/preferences");
  return response.data;
};
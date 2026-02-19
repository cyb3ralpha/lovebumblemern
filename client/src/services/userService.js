import AuthService from "./AuthService";

const api = AuthService.api;

/* ---------------------------------------------
   GET CURRENT USER
--------------------------------------------- */
const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

/* ---------------------------------------------
   GET USER BY ID
--------------------------------------------- */
const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

/* ---------------------------------------------
   UPDATE PROFILE
--------------------------------------------- */
const updateProfile = async (profileData) => {
  const response = await api.put("/users/update", profileData);
  return response.data;
};

/* ---------------------------------------------
   UPLOAD PROFILE PICTURE
--------------------------------------------- */
const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("profilePic", file);

  const response = await api.post("/users/upload-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* ---------------------------------------------
   DELETE ACCOUNT
--------------------------------------------- */
const deleteAccount = async () => {
  const response = await api.delete("/users/delete");
  return response.data;
};

/* ---------------------------------------------
   SEARCH USERS
--------------------------------------------- */
const searchUsers = async (query) => {
  const response = await api.get(`/users/search?q=${query}`);
  return response.data;
};

/* ---------------------------------------------
   GET SUGGESTED USERS (DISCOVER)
--------------------------------------------- */
const getSuggestedUsers = async () => {
  const response = await api.get("/users/suggestions");
  return response.data;
};

/* ---------------------------------------------
   BLOCK USER
--------------------------------------------- */
const blockUser = async (targetUserId) => {
  const response = await api.post("/users/block", {
    targetUserId,
  });

  return response.data;
};

/* ---------------------------------------------
   REPORT USER
--------------------------------------------- */
const reportUser = async (targetUserId, reason) => {
  const response = await api.post("/users/report", {
    targetUserId,
    reason,
  });

  return response.data;
};

/* ---------------------------------------------
   EXPORT
--------------------------------------------- */
const userService = {
  getCurrentUser,
  getUserById,
  updateProfile,
  uploadProfilePicture,
  deleteAccount,
  searchUsers,
  getSuggestedUsers,
  blockUser,
  reportUser,
};

export default userService;

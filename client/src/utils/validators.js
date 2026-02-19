/* =====================================================
   TOKEN HELPERS
===================================================== */

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

/* =====================================================
   DATE HELPERS
===================================================== */

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString();
};

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

/* =====================================================
   VALIDATION HELPERS
===================================================== */

export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // Minimum 6 characters
  return password.length >= 6;
};

/* =====================================================
   TEXT HELPERS
===================================================== */

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
};

export const capitalizeFirstLetter = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/* =====================================================
   DONATION HELPERS
===================================================== */

export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

/* =====================================================
   MATCH HELPERS
===================================================== */

export const isMatch = (userId, matches) => {
  return matches.some((match) =>
    match.users.includes(userId)
  );
};

/* =====================================================
   RANDOM HELPERS
===================================================== */

export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

/* =====================================================
   FILE HELPERS
===================================================== */

export const getFilePreview = (file) => {
  return URL.createObjectURL(file);
};

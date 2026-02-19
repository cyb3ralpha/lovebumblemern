import AuthService from "./AuthService";

const api = AuthService.api;

/* ---------------------------------------------
   GET ALL USER CONVERSATIONS
--------------------------------------------- */
const getConversations = async () => {
  const response = await api.get("/chat/conversations");
  return response.data;
};

/* ---------------------------------------------
   GET MESSAGES FOR A CONVERSATION
--------------------------------------------- */
const getMessages = async (conversationId) => {
  const response = await api.get(`/chat/messages/${conversationId}`);
  return response.data;
};

/* ---------------------------------------------
   SEND MESSAGE
--------------------------------------------- */
const sendMessage = async (conversationId, message) => {
  const response = await api.post("/chat/send", {
    conversationId,
    message,
  });

  return response.data;
};

/* ---------------------------------------------
   CREATE NEW CONVERSATION
--------------------------------------------- */
const createConversation = async (receiverId) => {
  const response = await api.post("/chat/create", {
    receiverId,
  });

  return response.data;
};

/* ---------------------------------------------
   DELETE CONVERSATION
--------------------------------------------- */
const deleteConversation = async (conversationId) => {
  const response = await api.delete(`/chat/${conversationId}`);
  return response.data;
};

/* ---------------------------------------------
   EXPORT
--------------------------------------------- */
const chatService = {
  getConversations,
  getMessages,
  sendMessage,
  createConversation,
  deleteConversation,
};

export default chatService;

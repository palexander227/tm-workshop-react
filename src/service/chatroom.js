import http from "./http";

function SendOnlyMessage(chatInfo) {
  return http.post("chatroom/messages", chatInfo);
}

function getAllMessagesOfChat(chatId) {
  return http.get(`chatroom/${chatId}/messages`);
}

function getAllChatOfUser() {
  return http.get(`chatroom`);
}

function getConverstion(reciverId) {
  return http.get(`chatroom/messages?receiverId=${reciverId}`);
}

export default {
  SendOnlyMessage,
  getAllMessagesOfChat,
  getAllChatOfUser,
  getConverstion,
};

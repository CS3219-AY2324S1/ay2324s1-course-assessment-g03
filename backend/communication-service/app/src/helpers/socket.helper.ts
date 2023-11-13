import { Socket, Server } from "socket.io";
import { SOCKET_API } from "../constants/socket";
import { JSEND_STATUS } from "../types/models.type";
import { getOneRoomInfo, sendMessageInRoom } from "../models/rooms.model";
import { Message } from "../types/rooms/rooms.type";

export function handleChatMessage(
  io: Server,
  roomId: string,
  userId: string,
  message: string
) {
  const sendMessageInRoomData = sendMessageInRoom(userId, roomId, message);

  if (sendMessageInRoomData.status !== JSEND_STATUS.SUCCESS) {
    return console.error(sendMessageInRoomData.data);
  }

  const { sender } = sendMessageInRoomData.data;

  // Emit the message to all users in the room including the sender
  io.in(roomId).emit(SOCKET_API.CHAT_MESSAGE_RESPONSE, {
    sender,
    message,
  } as Message);
}

export function handleGetMessages(socket: Socket, roomId: string) {
  const getOneRoomInfoData = getOneRoomInfo(roomId);

  if (getOneRoomInfoData.status !== JSEND_STATUS.SUCCESS) {
    return console.error(getOneRoomInfoData.data);
  }

  const { messages } = getOneRoomInfoData.data;
  socket.emit(SOCKET_API.GET_MESSAGES_RESPONSE, messages);
}
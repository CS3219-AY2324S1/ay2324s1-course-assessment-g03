import moment from "moment";
import { rooms } from "../db/rooms.db";
import { HttpStatus } from "../utils/HTTP_Status_Codes";
import { JSEND_STATUS } from "../types/models.type";
import { Message, Room, System, User } from "../types/rooms/rooms.type";
import { Socket } from "socket.io";
import { SOCKET_API } from "../constants/socket";

export const createOneRoom = (roomId: string) => {
  if (roomId in rooms) {
    return {
      status: JSEND_STATUS.FAILURE,
      code: HttpStatus.BAD_REQUEST,
      data: {
        roomId: "Room already exists",
      },
    };
  }

  const newRoom: Room = {
    created: moment(),
    updated: moment(),
    users: new Map(),
    messages: [],
  };

  rooms[roomId] = newRoom;

  return {
    status: JSEND_STATUS.SUCCESS,
    code: HttpStatus.CREATED,
    data: {
      created: rooms[roomId].created,
      roomId: roomId,
    },
  };
};

export const getOneRoomInfo = (roomId: string) => {
  if (!(roomId in rooms)) {
    return {
      status: JSEND_STATUS.FAILURE,
      code: HttpStatus.NOT_FOUND,
      data: {
        roomId: "Room not found",
      },
    };
  }

  // Transform users into list
  const { users, ...roomData } = rooms[roomId];
  const userList = Array.from(users.values());

  return {
    status: JSEND_STATUS.SUCCESS,
    code: HttpStatus.OK,
    data: {
      users: userList,
      ...roomData,
    },
  };
};

export const joinOneRoom = (socket: Socket, roomId: string, user: User) => {
  if (!(roomId in rooms)) {
    return {
      status: JSEND_STATUS.FAILURE,
      code: HttpStatus.NOT_FOUND,
      data: { roomId: "Room not found" },
    };
  }

  const userId = user.id;
  user.connected = true;

  const room = rooms[roomId];
  const users = room.users;

  if (!users.has(userId)) {
    users.set(userId, user);

    const systemMessage: Message = {
      sender: System,
      message: `${user.name ?? user.email} has joined the room`,
    };

    room.messages.push(systemMessage);

    socket.to(roomId).emit(SOCKET_API.CHAT_MESSAGE_RESPONSE, systemMessage);
  }

  return {
    status: JSEND_STATUS.SUCCESS,
    code: HttpStatus.OK,
    data: {
      user: user,
    },
  };
};

export const disconnectOneUserFromRoom = (roomId: string, userId: string) => {
  if (!(roomId in rooms)) {
    return {
      status: JSEND_STATUS.FAILURE,
      code: HttpStatus.NOT_FOUND,
      data: { roomId: "Room not found" },
    };
  }

  const users = rooms[roomId].users;

  if (!users.has(userId)) {
    return {
      status: JSEND_STATUS.FAILURE,
      code: HttpStatus.NOT_FOUND,
      data: { userId: "User not found" },
    };
  }

  const room = rooms[roomId];
  const user = users.get(userId)!;

  users.set(userId, { ...user, connected: false });

  return {
    status: JSEND_STATUS.SUCCESS,
    code: HttpStatus.OK,
    data: {
      user,
    },
  };
};

export const findUserInRoom = (userId: string) => {
  for (const roomId in rooms) {
    const { users } = rooms[roomId];

    if (users.get(userId)) {
      return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: {
          roomId,
          user: users.get(userId),
        },
      };
    }
  }

  return {
    status: "success",
    code: HttpStatus.OK,
    data: { userId },
  };
};

export const sendMessageInRoom = (
  userId: string,
  roomId: string,
  message: string
) => {
  if (!(roomId in rooms)) {
    return {
      status: JSEND_STATUS.FAILURE,
      code: HttpStatus.NOT_FOUND,
      data: { roomId: "Room not found" },
    };
  }

  const room = rooms[roomId];
  const users = room.users;

  if (!users.has(userId)) {
    return {
      status: JSEND_STATUS.FAILURE,
      code: HttpStatus.NOT_FOUND,
      data: { userId: "User not found" },
    };
  }

  const sender: User = users.get(userId)!;

  room.messages.push({ sender, message });

  return {
    status: JSEND_STATUS.SUCCESS,
    code: HttpStatus.OK,
    data: {
      sender,
      message,
    },
  };
};

export const leaveOneRoom = (roomId: string, userId: string) => {
  if (!(roomId in rooms)) {
    return {
      status: JSEND_STATUS.FAILURE,
      code: HttpStatus.NOT_FOUND,
      data: { roomId: "Room not found" },
    };
  }

  const users = rooms[roomId].users;

  if (!users.has(userId)) {
    return {
      status: JSEND_STATUS.FAILURE,
      code: HttpStatus.NOT_FOUND,
      data: { userId: "User not found" },
    };
  }

  users.delete(userId);

  return {
    status: "success",
    code: HttpStatus.OK,
    data: { userId, roomId },
  };
};
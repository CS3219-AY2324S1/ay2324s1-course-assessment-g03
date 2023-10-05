interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
export interface Preferences {
  difficulty: DifficultyType[];
  category: TopicTagType[];
}

export interface RoomParams {
  user: User;
  preferences: Preferences;
}

export interface WaitingUser {
  user: User;
  roomId: string;
  preferences: Preferences;
}

export interface MatchedRoom {
  user1: User;
  user2: User;
  roomId: string;
  preferences: Preferences;
}

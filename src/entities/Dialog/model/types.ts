import { ApiGetChats } from "@/app/api/chats/route";

export interface DialogComponentProps {
  userId: string;
  userName: string;
  userEmojiAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  countUnreadMessages: number;
}

// type useDialogsParams = {
//   isEnabled?: boolean;
// };

// export type UseDialogs = (args?: useDialogsParams) => ApiGetChats;
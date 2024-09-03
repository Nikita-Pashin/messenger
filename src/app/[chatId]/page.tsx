import { Chat } from "@/widgets/Chat";
import { Dialogs } from "@/widgets/Dialogs";

export default function ChatPage({ params }: { params: { chatId: string } }) {
  return (
    <div className="w-full">
      <div className="min-w-64 max-w-64">
        <Dialogs className="h-screen overflow-x-auto" />
      </div>
      <Chat chatId={params.chatId} className="h-screen overflow-x-auto" />
    </div>
  );
};

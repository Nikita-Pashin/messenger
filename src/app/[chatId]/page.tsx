import { Chat } from "@/widgets/Chat";

export default function ChatPage({ params }: { params: { chatId: string } }) {
  return (
    <div className="w-full">
      <Chat chatId={params.chatId} className="h-screen overflow-x-auto" />
    </div>
  );
};

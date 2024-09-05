import { Chat } from "@/widgets/Chat";

export default function ChatPage({ params }: { params: { chatId: string } }) {
  return (
    <div>
      <Chat chatId={params.chatId} className="h-screen overflow-x-auto pb-24" />
    </div>
  );
};

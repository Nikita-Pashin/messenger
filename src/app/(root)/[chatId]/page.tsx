import { Chat } from "@/widgets/Chat";

export default function ChatPage({ params }: { params: { chatId: string } }) {
  console.log(params)

  return (
    <div>
      <Chat chatId={params.chatId} className="h-screen overflow-x-auto pb-24" />
    </div>
  );
};

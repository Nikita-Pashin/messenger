import { Chat } from "@/widgets/Chat";
import { Dialogs } from "@/widgets/Dialogs";

export default function Home() {
  return (
    <div className="flex">
      <div className="h-screen basis-80">
        <Dialogs />
      </div>
      
      <div className="w-full">
        <Chat />
      </div>
    </div>
  );
};

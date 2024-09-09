import { getDictionary } from "@/shared/i18n";
import { Dialogs } from "@/widgets/Dialogs";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const d = getDictionary();

  return (
    <div className="flex">
      <div className="basis-80">
        <Dialogs className="h-screen overflow-x-auto" d={d} />
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  )
}
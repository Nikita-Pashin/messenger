import { FindUserInput } from "@/features/FindUserInput";
import { getDictionary } from "@/shared/i18n";
import { Dialogs } from "@/widgets/Dialogs";
import { Sidebar } from "@/widgets/Sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const d = getDictionary();

  return (
    <div className="flex h-screen">
      <Sidebar d={d} />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

import { Dialogs } from "@/widgets/Dialogs";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="basis-80">
        <Dialogs className="h-screen overflow-x-auto" />
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  )
}
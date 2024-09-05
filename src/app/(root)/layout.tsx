import { Dialogs } from "@/widgets/Dialogs"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <div className="min-w-64 max-w-64">
        <Dialogs className="h-screen overflow-x-auto" />
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
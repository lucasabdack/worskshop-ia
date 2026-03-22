import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TabBar } from "@/components/layout/TabBar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex flex-col min-h-screen bg-neutral-light max-w-[430px] mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-20 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">{children}</main>
      <TabBar />
    </div>
  );
}

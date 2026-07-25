import AdminSidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "TICOWE Admin",
  description: "Managing TICOWE Website",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0EDE4] font-sans">
      <AdminSidebar />

      <main className="min-h-screen w-full lg:pl-72">
        <div className="pt-24 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
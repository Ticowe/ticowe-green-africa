import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "TICOWE Green Africa",
  description: "Community empowerment and sustainable development in Kenya",
  icons: {
    icon: "/images/logo.png", // your favicon/logo
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
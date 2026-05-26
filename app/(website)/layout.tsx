import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "TICOWE Green Africa",
    template: "%s | TICOWE Green Africa",
  },

  description:
    "TICOWE Green Africa is a Kenyan organization focused on community empowerment, environmental sustainability, youth development, and green innovation.",

  keywords: [
    "TICOWE Green Africa",
    "Kenya NGO",
    "community empowerment Kenya",
    "sustainable development",
    "green Africa",
    "environmental conservation Kenya",
    "youth empowerment",
  ],

  authors: [{ name: "TICOWE Green Africa" }],

  creator: "TICOWE Green Africa",

  metadataBase: new URL("https://ticowegreenafrica.com"),

  openGraph: {
    title: "TICOWE Green Africa",
    description:
      "Community empowerment and sustainable development initiatives in Kenya.",
    url: "https://ticowegreenafrica.com",
    siteName: "TICOWE Green Africa",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "TICOWE Green Africa",
      },
    ],
    locale: "en_KE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TICOWE Green Africa",
    description:
      "Community empowerment and sustainable development initiatives in Kenya.",
    images: ["/images/logo.png"],
  },

  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },

  robots: {
    index: true,
    follow: true,
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
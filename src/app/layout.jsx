import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "New Tattoo Ink Studio",
  description: "Transformando sua pele em arte.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          font-sans
          bg-black text-white
          antialiased scroll-smooth
        `}
      >
        <AuthProvider>
          <Header />
          {/* Garante espaço abaixo do header fixo */}
          <main className="pt-[64px]">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

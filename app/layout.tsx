import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Joyanta — Textile Chemical Engineer",
  description: "Portfolio of Joyanta, Textile Chemical Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0f0f0f", fontFamily: "sans-serif" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
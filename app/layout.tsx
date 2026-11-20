import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Stabilizers — Help on the move",
  description:
    "Clear prompts to help you contact local emergency services and follow a professional's guidance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={lato.variable} data-scroll-behavior="smooth" lang="en">
      <body>{children}</body>
    </html>
  );
}

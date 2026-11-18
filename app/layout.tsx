import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stabilizers — Help on the move",
  description:
    "Clear prompts to help you contact local emergency services and follow a professional's guidance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

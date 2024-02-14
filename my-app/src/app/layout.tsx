import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ThemeProvider from "./providers/theme-provider";

export const metadata: Metadata = {
  title: "Rustic Nests",
  description:
    "a plateform for buying and renting minimalistic and rustic properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ThemeProvider>
          <body>{children}</body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}

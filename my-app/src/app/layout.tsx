import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import ThemeProvider from "./providers/theme-provider";
import LayoutProvider from "./providers/layout-provider";

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
          <body>
            <LayoutProvider>{children}</LayoutProvider>
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}

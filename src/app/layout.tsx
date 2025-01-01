import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster"

const geistInter = Inter({
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Next App",
  description: "Generated by create next app",
};

export default function RootLayout( {children,}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistInter.className} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Header/>
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

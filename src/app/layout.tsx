import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google"; // Commenting out default fonts for now
import "./globals.css";
import { fonts } from "@/styles/typography"; // Assuming we'll use this for body font
import { NavigationProvider } from "@/context/NavigationContext"; // Import the provider

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Architecture Portfolio", // Updated title
  description: "A modern architecture portfolio website.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      {/* We can apply a global font style here later, e.g., from our typography.ts */}
      <body style={{ fontFamily: fonts.body }}>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}

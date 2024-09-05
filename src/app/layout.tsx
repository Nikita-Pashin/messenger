import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/_app/providers/ReactQueryProvider";

const inter = Roboto({ subsets: ["cyrillic"], weight: ['300', '400', '500', '700'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}

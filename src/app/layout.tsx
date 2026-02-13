import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Decrypted",
  description: "A cryptographic protocol exercise generator",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <header className="fixed top-0 w-full px-4 py-3 lg:px-8 xl:pg-32 lg:py-4 z-[60] pointer-events-none">
          <div className="flex items-center justify-center w-full py-4 px-4">
            <a href="/" className="z-10 pointer-events-auto">
              <span className="logo-shimmer font-extrabold text-3xl lg:text-4xl uppercase tracking-wide">
                decrypted
              </span>
            </a>
          </div>
        </header>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

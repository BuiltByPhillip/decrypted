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
          <div className="flex items-center justify-between w-full py-4 px-4">
            <a href="/public" className="z-10 pointer-events-none">
              <span className="text-light font-geist-mono font-extrabold text-2xl lg:text-3xl uppercase text-foreground tracking-wide">
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

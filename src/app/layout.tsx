import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import Providers from "@/components/providers/";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Nav from "@/components/nav";

const questrial = Questrial({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Typeform",
  description: "Fill out the form to get started.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          questrial.className,
        )}
      >
        <Providers>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <Nav />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

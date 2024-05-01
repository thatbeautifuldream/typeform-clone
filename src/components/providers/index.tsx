"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </>
  );
};

export default Providers;

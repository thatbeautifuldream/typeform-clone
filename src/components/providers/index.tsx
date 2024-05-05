"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const progressColor = theme === "dark" ? "#3B81F6" : "#2463EB";
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <ProgressBar
          height="4px"
          color={progressColor}
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </>
  );
};

export default Providers;

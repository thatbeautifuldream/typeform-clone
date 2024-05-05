"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

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
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </>
  );
};

export default Providers;

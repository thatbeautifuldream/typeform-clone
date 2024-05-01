"use client";

import { Disclosure } from "@headlessui/react";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo from "@/components/logo";

export default function Nav() {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Disclosure as="nav" className="bg-background">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Logo className="w-28 h-28" />
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

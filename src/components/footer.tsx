"use client";

import { Disclosure } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 right-0 w-full z-50">
      <Disclosure as="nav" className="bg-background">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 text-secondary-foreground/50">
              Created by Milind Mishra
            </div>
            <div className="flex items-center">
              <Button
                className="text-secondary-foreground/50"
                variant="outline"
              >
                Portfolio <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

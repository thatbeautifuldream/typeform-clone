"use client";

import { Disclosure } from "@headlessui/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
              <Link
                className="flex text-secondary-foreground/50 hover:text-secondary-foreground/75  hover:underline  hover:underline-offset-4 transition-colors"
                href="https://milindmishra.com"
                target="_blank"
              >
                Portfolio <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps, ReactNode } from "react";

type NavProps = {
  children: ReactNode;
};

const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-center items-center px-4">
      {children}
    </nav>
  );
};

const NavLink = (props: Omit<ComponentProps<typeof Link>, "className">) => {
  const pathName = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible::bg-secondary focus-visible:::text-secondary-foreground",
        pathName === props.href && "bg-background text-foreground"
      )}
    />
  );
};

export { Nav, NavLink };

"use client";

import { SessionProvider } from "next-auth/react";
import { LogoutButton } from "./LogoutButton";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <div className="flex flex-col">
        <LogoutButton />
        <div>{children}</div>
      </div>
    </SessionProvider>
  );
};

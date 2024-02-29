"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export const LogoutButton = () => {
  const { status } = useSession();

  return (
    <div className="m-4">
      {status === "authenticated" && (
        <button className="bg-blue-500 text-white rounded px-4 py-2">
          <span onClick={() => signOut()}>Logout</span>
        </button>
      )}
    </div>
  );
};

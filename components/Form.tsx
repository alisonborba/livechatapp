"use client";

import { useRef, useState } from "react";
import { postData } from "@/app/action";
import { useSession } from "next-auth/react";

export default function Form() {
  const [msg, setMsg] = useState("");
  const { data } = useSession();
  const userEmail = data?.user.email;

  return (
    <form
      action={async () => {
        await postData(msg, userEmail || "");
        setMsg("");
        console.log("Form", msg);
      }}
      className="p-6 fixed bottom-0 left-0 w-full bg-white"
    >
      <div className="flex">
        <input
          type="text"
          name="message"
          value={msg}
          placeholder="Type your message..."
          className="flex-grow py-2 px-4 outline-none"
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          disabled={!userEmail}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
        >
          Send
        </button>
      </div>
    </form>
  );
}

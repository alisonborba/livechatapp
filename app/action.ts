"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authConfig } from "@/lib/auth";

import { channelName, eventName } from "@/components/constants";

export async function postData(message: string, userEmail: string) {
  "use server";
  const Pusher = require("pusher");

  console.log("userEmail", userEmail);

  const data = await prisma?.message?.create({
    data: {
      message,
      email: userEmail,
    },
    include: {
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
  });

  pusher.trigger(channelName, eventName, {
    message: `${JSON.stringify(data)}\n\n`,
  });
}

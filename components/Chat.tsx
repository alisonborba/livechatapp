"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { channelName, eventName } from "@/components/constants";

interface iAppProps {
  data: {
    User: {
      image: string | null;
      name: string | null;
    };
    message: string;
  }[];
}

export default function ChatComponent({ data }: iAppProps) {
  const [totalComments, setTotalComments] = useState(data);
  const messageEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(channelName);

    channel.bind(eventName, function (data: any) {
      const parsedComments = JSON.parse(data.message);
      setTotalComments((prev) => [...prev, parsedComments]);
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, []);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [totalComments]);

  return (
    <div className="p-6 flex-grow pb-32">
      <div className="flex flex-col gap-4">
        {totalComments?.map((message, index) => (
          <div key={index}>
            <div className="flex items-center">
              <Image
                src={message.User?.image as string}
                alt="Profile user image"
                width={50}
                height={50}
                className="w-12 h-12 object-cover rounded-lg mr-4"
              />

              <div className="rounded-lg bg-white p-4 shadow-md self-start">
                {message.message}
              </div>
            </div>

            <p className="font-light text-sm text-gray-600">
              {message.User?.name}
            </p>
          </div>
        ))}

        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}

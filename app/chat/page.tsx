import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import Form from "@/components/Form";
import { prisma } from "@/lib/db";
import ChatComponent from "@/components/Chat";

async function getData() {
  const data = await prisma?.message?.findMany({
    select: {
      id: true,
      message: true,
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 50,
  });

  return data;
}

//! Next JS Cache Busting
export const dynamic = "force-dynamic";

export default async function ChatHomepage() {
  const session = await getServerSession(authConfig);
  const data = await getData();

  if (!session) redirect("/");

  return (
    <div className="flex flex-col">
      <ChatComponent data={data as any} />
      <Form />
    </div>
  );
}

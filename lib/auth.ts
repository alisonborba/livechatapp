import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { getRandomAvatar } from "@/app/TestDB";
// import prisma from "./prisma";

export const authConfig: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    // CredentialsProvider({
    //   name: "Sign in",
    //   credentials: {},
    //   async authorize(credentials): Promise<any> {
    //     if (!credentials || !credentials.email) return null;
    //     console.log("credentials", credentials);
    //     const user = await prisma.user.create({
    //       data: {
    //         email: credentials.email,
    //         name: credentials.email,
    //         image: await getRandomAvatar(),
    //       },
    //     });
    //     console.log("user DBBB", user);
    //     return true;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}

// export function loginIsRequiredClient() {
//   if (typeof window !== "undefined") {
//     const session = useSession();
//     const router = useRouter();
//     if (!session) router.push("/");
//   }
// }

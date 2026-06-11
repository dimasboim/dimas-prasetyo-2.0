import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../lib/prisma";

export default async function handler(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "POST") {
    const { title, body } = req.body;
    await prisma.content.upsert({
      where: { slug: "home" },
      update: { title, body },
      create: { slug: "home", title, body }
    });
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
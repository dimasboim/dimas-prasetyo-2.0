import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { hashPassword } from "../lib/auth";
import { prisma } from "../lib/prisma";

dotenv.config();

async function main() {
  const password = crypto.randomBytes(6).toString("base64url");
  const hashed = await hashPassword(password);

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@domain.com" },
    update: { password: hashed },
    create: {
      email: process.env.ADMIN_EMAIL || "admin@domain.com",
      password: hashed,
      name: "Administrator",
      role: "admin"
    }
  });

  await prisma.content.upsert({
    where: { slug: "home" },
    update: {},
    create: {
      slug: "home",
      title: "Dimas Prasetyo",
      body: "<p>Selamat datang di halaman profil Dimas Prasetyo. Edit konten setelah login.</p>"
    }
  });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT || 587),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: "Password Admin Dimas Prasetyo",
    html: `<p>Password admin Anda: <strong>${password}</strong></p>`
  });

  console.log("Admin created:", admin.email);
  console.log("Password sent to:", process.env.ADMIN_EMAIL);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
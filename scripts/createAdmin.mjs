import fs from "node:fs";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/model/user.js";

if (!process.env.MONGO_URI && !process.env.MONGO_URL && fs.existsSync(".env")) {
  try {
    process.loadEnvFile(".env");
  } catch {
    // Ignore malformed env files; the connection check below reports the problem.
  }
}

const [, , rawPhone, rawPassword, rawUsername] = process.argv;

if (!rawPhone || !rawPassword) {
  console.error("Usage: npm run seed:admin -- <phone> <password> [username]");
  process.exit(1);
}

const phone = rawPhone.trim();
const password = rawPassword;

if (!/^\+?[1-9]\d{6,14}$/.test(phone)) {
  console.error("Phone must be a valid international number, for example +15551234567");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Password must be at least 8 characters");
  process.exit(1);
}

const mongoUrl = process.env.MONGO_URI || process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Set MONGO_URI (or MONGO_URL) in .env before running this script");
  process.exit(1);
}

try {
  await mongoose.connect(mongoUrl);
  const passwordHash = await bcrypt.hash(password, 10);
  const existing = await User.findOne({ phone }).select("+password");

  if (existing) {
    existing.password = passwordHash;
    existing.role = [...new Set([...(existing.role || []), "ADMIN"])];
    await existing.save();
    console.log(`Promoted ${phone} to admin`);
  } else {
    await User.create({
      phone,
      password: passwordHash,
      username: rawUsername || "Admin",
      role: ["ADMIN"],
    });
    console.log(`Created admin ${phone}`);
  }
} catch (error) {
  console.error(`Failed to create admin: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}

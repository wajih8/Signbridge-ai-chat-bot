import connectDB from "@/lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs"; // You need to install: npm install bcryptjs
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, email, password, userType } = await req.json();

    await connectDB();

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // 2. Hash Password
   

    // 3. Create User with the specific CLASS (userType)
    await User.create({
      username,
      email,
      password,
      userType, // This saves 'mother_child', 'deaf_helper', or 'autism_parent'
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error occured during registration" }, { status: 500 });
  }
}
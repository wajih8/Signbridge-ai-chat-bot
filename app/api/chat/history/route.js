import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  
  // Find the user
  const user = await User.findOne({ email: session.user.email });
  
  // Find all chats belonging to this user, sort by newest first
  const chats = await Chat.find({ userId: user._id })
    .select('title messages timestamp') // Only get necessary fields
    .sort({ 'messages.timestamp': -1 }); 

  return NextResponse.json({ chats });
}
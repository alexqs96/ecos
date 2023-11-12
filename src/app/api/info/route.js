import { connectMongo } from "@/lib/connectMongo";
import Database from "@/lib/models/Database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();

    const data = await Database.find().lean();

    return NextResponse.json(data, {
      status: 200,
      statusText: "Info",
    });
  } catch (error) {
    return NextResponse.json([], {
      status: 500,
      statusText: "Error Info",
    });
  }
}

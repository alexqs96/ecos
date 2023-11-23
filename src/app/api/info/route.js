import Database from "@/lib/models/Database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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

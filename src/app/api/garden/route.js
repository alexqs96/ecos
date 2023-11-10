import { connectMongo } from "@/lib/connectMongo";
import Vegetable from "@/lib/models/Vegetables";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();

    const data = await Vegetable.find().lean();
    console.log(data.length);
    return NextResponse.json(data, {
      status: 200,
      statusText: "Lista de Verduras",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: "Error Verduras",
      },
    );
  }
}

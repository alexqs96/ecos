import Vegetable from "@/lib/models/Vegetables";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const data = await Vegetable.find().lean();

    return NextResponse.json(
      data, {
      status: 200,
      statusText: "Lista de Verduras",
    });
  } catch (error) {
    console.log("Error /garden "+error);
    return NextResponse.json(
      [],
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}

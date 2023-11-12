import { SERVER_ERROR } from "@/lib/consts";
import Vegetable from "@/lib/models/Vegetables";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const data = await Vegetable.find().lean();

    return NextResponse.json({
      message: "Lista de Verduras",
      data
    }, {
      status: 200,
      statusText: "Lista de Verduras",
    });
  } catch (error) {
    console.log("Error /garden "+error);
    return NextResponse.json(
      {
        message: SERVER_ERROR,
        data: []
      },
      {
        status: 500,
        statusText: "Error Verduras",
      },
    );
  }
}

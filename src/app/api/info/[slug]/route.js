import { MISSING_FIELDS } from "@/lib/consts";
import Database from "@/lib/models/Database";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json({},{
        status: 404,
        statusText: MISSING_FIELDS
      })
    }

    const data = await Database.findOne({slug})

    return NextResponse.json(data, {
      status: 200,
      statusText: "Info encontrada"
    })

  } catch (error) {
    console.log("/info ", error);
    return NextResponse.json({}, {
      status: 500,
      statusText: "Error Info",
    });
  }
}
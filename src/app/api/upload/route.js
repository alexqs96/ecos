import Database from "@/lib/models/Database";
import { NextResponse } from "next/server";

export async function POST(req){
  try {
    const body = await req.json()

    new Database({...body}).save()

    return NextResponse.json({},{
      status: 200,
      statusText: "Datos Guardados"
    })
  } catch (error) {
    console.log("/upload error: "+error);
    return NextResponse.json({},{
      status: 500,
      statusText: "Server Error: No se pudo guardar los datos"
    })
  }
}
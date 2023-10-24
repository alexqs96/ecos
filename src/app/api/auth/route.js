import { NextResponse } from "next/server";

export async function GET(){
  try {
    return NextResponse.json({},{
      status: 200,
      statusText: "Auth"
    })
  } catch (error) {
    console.log("/auth error: "+error);
    return NextResponse.json({},{
      status: 500,
      statusText: "Server Error"
    })
  }
}
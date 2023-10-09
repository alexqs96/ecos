import { NextResponse } from "next/server";

export function GET(){
  try {
    return NextResponse.json({},{
      status: 200,
      statusText: "Posts"
    })
  } catch (error) {
    console.log("/posts error: "+error);
    return NextResponse.json({},{
      status: 500,
      statusText: "Server Error"
    })
  }
}
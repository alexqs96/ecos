import { NextResponse } from "next/server";

export async function GET(){
  try {
    return NextResponse.json({},{
      status: 200,
      statusText: "SignIn"
    })
  } catch (error) {
    console.log("/auth/signin error: "+error);
    return NextResponse.json({},{
      status: 500,
      statusText: "Server Error"
    })
  }
}
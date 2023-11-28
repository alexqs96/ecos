import { MISSING_FIELDS, SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import Trade from "@/lib/models/Trade";
import User from "@/lib/models/User";

export const dynamic = 'force-dynamic'

export async function GET(req){
  try {
    const session = await getServerSession(AuthOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          message: USER_NOT_LOGGED_IN,
        },
        {
          status: 401,
          statusText: USER_NOT_LOGGED_IN,
        },
      );
    }

    const data = await Trade.find({
      participants: { $in: [session?.user?.username] }

    }).populate("from.user").populate("to.user")

    return NextResponse.json(data, {
      status: 200,
      statusText: "Listado de Intercambios"
    })

  } catch (error) {
    console.log("/users/trade error: "+error);
    return NextResponse.json([],{
      status: 500,
      statusText: SERVER_ERROR
    })
  }
}
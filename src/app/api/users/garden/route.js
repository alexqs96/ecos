import { MISSING_FIELDS, SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import Garden from "@/lib/models/Garden";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function GET(req){
  try {
    const session = await getServerSession(AuthOptions)

    if (!session?.user) {
      return NextResponse.json(
        {
          message: USER_NOT_LOGGED_IN
        },
        {
          status: 401,
          statusText: USER_NOT_LOGGED_IN
        },
      );
    }

    const data = await Garden.find({
      owner: session?.user?._id
    })

    return NextResponse.json(data, {
      status: 200,
      statusText: data?.length+" Jardines encontrados"
    })

  } catch (error) {
    console.log("/users/garden error: "+error);
    return NextResponse.json([],{
      status: 500,
      statusText: SERVER_ERROR
    })
  }
}

export async function POST(req){
  try {
    const session = await getServerSession(AuthOptions)
    const { name, width, height, vegetables } = await req.json();

    if (!session?.user) {
      return NextResponse.json(
        {
          message: USER_NOT_LOGGED_IN
        },
        {
          status: 401,
          statusText: USER_NOT_LOGGED_IN
        },
      );
    }

    if (!name || !width || !height || !vegetables) {
      return NextResponse.json(
        {
          message: MISSING_FIELDS
        },
        {
          status: 404,
          statusText: MISSING_FIELDS
        },
      );
    }

    const newGarden = new Garden({
      owner: session?.user?._id,
      name,
      width,
      height,
      vegetables
    })

    await newGarden.save()

    return NextResponse.json({
      message: "Jardin creado con exito"
    }, {
      status: 200,
      statusText: "Jardin creado con exito"
    })

  } catch (error) {
    console.log("/users/garden error: "+error);
    return NextResponse.json([],{
      status: 500,
      statusText: SERVER_ERROR
    })
  }
}

import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { MISSING_FIELDS, SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import Garden from "@/lib/models/Garden";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
  try {
    const { id } = params;
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

    
    if (!id) {
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

    const data = await Garden.findOne({
      owner: session?.user?._id,
      _id: id
    })

    return NextResponse.json(data, {
      status: 200,
      statusText: data?.length+" Jardin encontrado"
    })

  } catch (error) {
    console.log("/users/garden/id error: "+error);
    return NextResponse.json({},{
      status: 500,
      statusText: SERVER_ERROR
    })
  }
}

export async function UPDATE(req, {params}){
  try {
    const { id } = params;
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

    if (!id || !name || !width || !height || !vegetables) {
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

    const updateGarden = await Garden.findOneAndUpdate({
      _id: id,
      owner: session?.user?._id,
    },{
      name,
      width,
      height,
      vegetables
    },{
      new: true
    })

    if(!updateGarden){
      return NextResponse.json({
        message: "Este Jardin no existe"
      }, {
        status: 404,
        statusText: "Este Jardin no existe"
      })
    }

    return NextResponse.json({
      message: "Jardin actualizado con exito"
    }, {
      status: 200,
      statusText: "Jardin actualizado con exito"
    })

  } catch (error) {
    console.log("/users/garden/id error: "+error);
    return NextResponse.json({},{
      status: 500,
      statusText: SERVER_ERROR
    })
  }
}

export async function DELETE(req, {params}){
  try {
    const { id } = params;
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

    if (!id) {
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

    await Garden.findOneAndDelete({
      owner: session?.user?._id,
      _id: id
    })

    return NextResponse.json({
      message: "Jardin borrado con exito"
    }, {
      status: 201,
      statusText: "Jardin borrado con exito"
    })

  } catch (error) {
    console.log("/users/garden/id error: "+error);
    return NextResponse.json({},{
      status: 500,
      statusText: SERVER_ERROR
    })
  }
}
import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { UploadImages } from "@/lib/cloudinaryUpload";
import { NextResponse } from "next/server";
import { MISSING_FIELDS, SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import User from "@/lib/models/User";

export async function PATCH(req) {
  try {
    const session = await getServerSession(AuthOptions);
    const { name, surname, about, country, city, photo, banner } = await req.json();
    const profileUploaded = photo? await UploadImages(photo, true) : null
    const bannerUploaded = banner? await UploadImages(banner, true) : null

    if (!session.user) {
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

    if (!name || !surname) {
      return NextResponse.json(
        {
          message: MISSING_FIELDS,
        },
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    const userFound = await User.findById(session?.user?._id).select('photo banner')

    await User.findByIdAndUpdate(session?.user?._id,{
      name,
      surname,
      about,
      location: {
        country,
        city
      },
      photo: profileUploaded || userFound.photo,
      banner: bannerUploaded || userFound.banner
    },{
      new: true,
    })

    const updatedUser = await User.findById(session?.user?._id).select('photo name surname')

    return NextResponse.json({
      name: updatedUser.name,
      surname: updatedUser.surname,
      photo: updatedUser.photo,
    }, {
      status: 200,
      statusText: "Perfil Actualizado",
    });

  } catch (error) {
    console.log("/users error: " + error);
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}
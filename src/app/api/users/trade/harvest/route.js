import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import Garden from "@/lib/models/Garden";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
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

    const vegetables = await Garden.find({
      owner: session?.user?._id,
      "vegetables.harvested": true,
    }).populate("vegetables.data");

    const data = vegetables.flatMap((garden) =>
      garden.vegetables.filter((veggie) => veggie.harvested === true),
    );

    return NextResponse.json(data, {
      status: 200,
      statusText: "Items disponibles para intercambiar",
    });
  } catch (error) {
    console.log("/users/trade/you error: " + error);
    return NextResponse.json([], {
      status: 500,
      statusText: SERVER_ERROR,
    });
  }
}

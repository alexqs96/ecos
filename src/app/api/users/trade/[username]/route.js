import { MISSING_FIELDS, SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Trade from "@/lib/models/Trade";
import User from "@/lib/models/User";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import Garden from "@/lib/models/Garden";
import Vegetable from "@/lib/models/Vegetables";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { username } = params;
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

    const otherUser = await User.findOne({
      username,
    }).select("_id");

    if (!otherUser) {
      return NextResponse.json(null, {
        status: 404,
        statusText: "Usuario no existe",
      });
    }

    const yourVegetables = await Garden.find({
      owner: session?.user?._id,
      "vegetables.harvested": true,
    }).populate("vegetables.data");

    const yourGarden = yourVegetables.flatMap((garden) =>
      garden.vegetables.filter((veggie) => veggie.harvested === true),
    );

    const otherVegetables = await Garden.find({
      owner: otherUser._id,
      "vegetables.harvested": true,
    }).populate("vegetables.data");

    const otherGarden = otherVegetables.flatMap((garden) =>
      garden.vegetables.filter((veggie) => veggie.harvested === true),
    );

    return NextResponse.json(
      {
        you: yourGarden,
        other: otherGarden,
      },
      {
        status: 200,
        statusText: "Items disponibles para intercambiar entre los usuarios",
      },
    );
  } catch (error) {
    console.log("/users/trade/username error: " + error);
    return NextResponse.json([], {
      status: 500,
      statusText: SERVER_ERROR,
    });
  }
}

export async function POST(req, { params }) {
  try {
    const { username } = params;
    const { yourVegetables, otherVegetables, accept } = await req.json();
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

    if (!username || !yourVegetables || !otherVegetables) {
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

    const otherUser = await User.findOne({
      username,
    }).select("_id");

    const findTrade = await Trade.findOne({
      participants: [session?.user?.username, username],
    })
      .populate("from.user")
      .populate("to.user");

    if (!findTrade) {
      const newTrade = new Trade({
        from: {
          user: session?.user?._id,
          vegetables: yourVegetables,
        },
        to: {
          user: otherUser._id,
          vegetables: otherVegetables,
        },
        participants: [session?.user?.username, username],
        date: new Date(),
      });

      await newTrade.save();

      return NextResponse.json(
        {
          message: "Intercambio Propuesto!",
        },
        {
          status: 200,
          statusText: "Intercambio Propuesto",
        },
      );
    }

    const accepted = {};

    if (findTrade.from.user.username === session?.user?.username) {
      accepted.you = accept || false;
    } else {
      accept.other = accept || false;
    }

    const updateTrade = await Trade.findOneAndUpdate(
      {
        participants: [session?.user?.username, username],
      },
      {
        from: {
          user:
            findTrade.from.user.username === session?.user?.username
              ? session?.user?._id
              : otherUser._id,
          vegetables:
            findTrade.from.user.username === session?.user?.username
              ? yourVegetables
              : otherVegetables,
        },
        to: {
          user:
            findTrade.from.user.username === session?.user?.username
              ? session?.user?._id
              : otherUser._id,
          vegetables:
            findTrade.from.user.username === session?.user?.username
              ? yourVegetables
              : otherVegetables,
        },
        accepted,
        decline,
      },
      {
        new: true,
      },
    );
  } catch (error) {
    console.log("/users/trade/username error: " + error);
    return NextResponse.json([], {
      status: 500,
      statusText: SERVER_ERROR,
    });
  }
}

import User from "@/lib/models/User";
import { EMAIL_REGISTERED, MISSING_FIELDS, SERVER_ERROR, USER_REGISTERED } from "@/lib/consts";
import { SignUpSchema } from "@/lib/schemas";
import { capitalize } from "@/utils/utils";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function POST(req) {
  try {
    const pageRoutes = [
      "home",
      "settings",
      "signin",
      "signup",
      "/"
    ]

    const { username, password, email, name, surname } = await req.json();

    const validateFields = SignUpSchema.safeParse({
      username,
      password,
      email,
      name,
      surname,
    });

    if (!validateFields.success) {
      return NextResponse.json(
        {},
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    if (pageRoutes.includes(username)) {
      return NextResponse.json(
        {},
        {
          status: 409,
          statusText: USER_REGISTERED,
        },
      );
    }

    const userFound = await User.findOne(
      { username: username.toLowerCase() },
      "+username",
    ).lean();

    const emailFound = await User.findOne(
      { email },
      "+email",
    ).lean();

    if (userFound || emailFound) {
      return NextResponse.json(
        {},
        {
          status: 409,
          statusText: emailFound? EMAIL_REGISTERED : USER_REGISTERED,
        },
      );
    }

    const newUser = new User({
      username: username.toLowerCase(),
      password: await hashPassword(password),
      email,
      name: capitalize(name),
      surname: capitalize(surname),
    });

    await newUser.save();

    return NextResponse.json(
      {},
      {
        status: 201,
        statusText: "Bienvenido " + capitalize(name),
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}

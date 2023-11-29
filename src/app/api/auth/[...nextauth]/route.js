import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/lib/models/User";
import bcrypt from 'bcryptjs'
import { INVALID_CREDENTIALS, MISSING_FIELDS } from "@/lib/consts";
import { SignInSchema } from "@/lib/schemas";

const handleLogin = async (data) => {
  try {
    const validateFields = SignInSchema.safeParse(data);

    if (!validateFields.success) {
      throw new Error(MISSING_FIELDS)
    }
  
    const userFound = await User.findOne({ username: data.username.toLowerCase() }).lean();
  
    if (!userFound) {
      throw new Error(INVALID_CREDENTIALS)
    }
  
    const validatePassword = await bcrypt.compare(
      data.password,
      userFound.password,
    );

    if (validatePassword) {
      delete userFound.password;
      return userFound
    }
    else{
      throw new Error(INVALID_CREDENTIALS)
    }  
  } catch (error) {
    throw new Error(error)
  }
}

export const AuthOptions = {
  providers: [
    CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      if (!credentials?.username || !credentials?.password) return null;

      try {
        const user = await handleLogin({
          username: credentials.username,
          password: credentials.password
        });

        return user;
      } catch (e) {
        return null;
      }
    },
  })
  ],
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (trigger === 'update' && session) {
        token.surname = session.user.surname;
        token.name = session.user.name;
        token.photo = session.user.photo;
      }

      if (user) {
        token.surname = user.surname;
        token.username = user.username;
        token.photo = user.photo;
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.surname = token.surname;
        session.user.username = token.username;
        session.user.photo = token.photo;
        session.user._id = token._id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    maxAge: 24 * 60 * 30
  }
}

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }
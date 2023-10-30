import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose';

export const createToken = async (payload) => {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setSubject(payload.sub)
		.setExpirationTime("1d")
		.sign(new TextEncoder().encode(process.env.JWT_SECRET))
};

export const verifyJWT = async (token) => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )
    ).payload
  } catch (error) {
    if (error) {
      throw new Error('El token ha expirado');
    } else {
      throw new Error('Error al verificar el token');
    }
  }
};

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
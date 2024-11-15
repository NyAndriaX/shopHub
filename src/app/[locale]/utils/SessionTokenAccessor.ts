import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { decrypt } from "./encryption";

export async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    const accessTokenDecrypted = decrypt(session.access_token);
    return accessTokenDecrypted
  }

  return null
}
export async function getIdToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    const idTokenDescrypted = decrypt(session.id_token);
    return idTokenDescrypted
  }
  return null
}
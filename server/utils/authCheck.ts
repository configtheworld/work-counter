import { getAuth } from "firebase-admin/auth";

export async function authCehck(authToken: string) {
  let validToken = false;

  let userId = "";
  if (authToken) {
    const [, token] = authToken.split(" ");
    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      const uid = decodedToken.uid;
      userId = uid;
      validToken = true;
    } catch (error) {
      validToken = false;
      console.error(error);
    }
  }
  return { validToken, userId };
}

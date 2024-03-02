import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
} from "@firebase/auth";
import { auth } from "./firebase";
import type { UserType } from "~/types/User";
const provider = new GoogleAuthProvider();
export const useAppAuth = () => {
  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider)
      .then(async (result) => {
        if (result !== null) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential !== null) {
            const token = credential.accessToken;
            return { user: result.user, token: token };
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    return res;
  };

  const logout = async () => {
    const userCookie = useCookie<UserType>("user");
    userCookie.value.token = "";
  };

  return {
    logout,
    loginWithGoogle,
  };
};

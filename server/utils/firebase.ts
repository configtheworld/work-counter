import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";

export const app = initializeApp({
  credential: cert("./service-account.json"),
});

export const firestore = getFirestore();
export const auth = getAuth(app);
export const fbtimestamp = Timestamp.fromDate(new Date());

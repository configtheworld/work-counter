import { Counter } from "~/types/Counter";
import { fbtimestamp, firestore } from "../utils/firebase";
import { authCheck } from "../utils/authCheck";

export default defineEventHandler(async (event) => {
  const authToken = event.headers.get("Authorization");

  if (event.method === "GET") {
    const { validToken, userId } = await authCheck(authToken ? authToken : "");

    const data: Counter[] = [];

    if (validToken) {
      const collectionRef = firestore.collection("counters");
      const querySnapshot = await collectionRef
        .orderBy("createdAt", "asc")
        .get();

      querySnapshot.forEach((doc) => {
        const collectionData = doc.data();
        collectionData.id = doc.id;
        const counterData = collectionData as Counter;
        if (counterData.userId === userId) {
          data.push(counterData);
        }
      });
    } else {
      return { message: "token-expired", status: 401 };
    }

    return { message: "counters found", status: 200, payload: data };
  } else if (event.method === "POST") {
    const { validToken, userId } = await authCheck(authToken ? authToken : "");

    if (validToken) {
      const body = await readBody(event);
      firestore
        .collection("counters")
        .add({
          isDone: false,
          minutes: body.minutes,
          name: body.name,
          color: body.color,
          userId: userId,
          createdAt: fbtimestamp,
        })
        .then(() => {
          return { message: "success", status: 200 };
        })
        .catch((error) => {
          console.error("Error creating the document: ", error);
          return { message: "Error creating the document:", status: 500 };
        });
    } else {
      return { message: "token-expired", status: 401 };
    }

    return { message: "success", status: 200 };
  } else {
    return { message: "method-not-allowed", status: 405 };
  }
});

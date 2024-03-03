import { Counter } from "~/types/Counter";
import { firestore } from "../utils/firebase";
import { authCheck } from "../utils/authCheck";

export default defineEventHandler(async (event) => {
  const authToken = event.headers.get("Authorization");
  const query = getQuery(event);

  if (event.method === "GET") {
    const { validToken, userId } = await authCheck(authToken ? authToken : "");

    const data: Counter[] = [];
    if (validToken) {
      const counterRef = firestore
        .collection("counters")
        .doc(query.id as string);

      await counterRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            data.push(doc.data() as Counter);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          return { message: "Document is not found", status: 404 };
        });
    } else {
      return { message: "token-expired", status: 401 };
    }
    return { message: "counters found", status: 200, payload: data };
  } else if (event.method === "DELETE") {
    const { validToken, userId } = await authCheck(authToken ? authToken : "");
    if (validToken) {
      firestore
        .collection("counters")
        .doc(query.id as string)
        .delete()
        .then(() => {
          return { message: "Document successfully deleted!", status: 200 };
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          return { message: "Error removing document", status: 404 };
        });
    } else {
      return { message: "Document is not found", status: 404 };
    }
  } else if (event.method === "PATCH") {
    const { validToken, userId } = await authCheck(authToken ? authToken : "");
    if (validToken) {
      const body = await readBody(event);
      firestore
        .collection("counters")
        .doc(body.id)
        .update({
          isDone: body.minutes === 0 ? true : false,
          minutes: body.minutes,
        })
        .then(() => {
          return { message: "Document successfully updated!", status: 200 };
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    } else {
      return { message: "token-expired", status: 401 };
    }
  } else {
    return { message: "method-not-allowed", status: 405 };
  }
});

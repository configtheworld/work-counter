import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const runtimeConfig = useRuntimeConfig();

const firebaseConfig = {
  apiKey: runtimeConfig.public.firebase.apiKey ?? "",
  authDomain: runtimeConfig.public.firebase.authDomain ?? "XXXXX",
  projectId: runtimeConfig.public.projectId ?? {},
  storageBucket: runtimeConfig.public.storageBucket ?? {},
  messagingSenderId: runtimeConfig.public.messagingSenderId ?? {},
  appId: runtimeConfig.public.appId ?? "1:XXXXX:web:XXXXX",
  measurementId: runtimeConfig.public.measurementId ?? "G-XXXXX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

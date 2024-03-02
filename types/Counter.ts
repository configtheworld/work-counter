import { Timestamp } from "firebase-admin/firestore";
export type Counter = {
  name: string;
  minutes: number;
  userId: string;
  id: string;
  isDone: boolean;
  color: string;
  createdAt: Timestamp;
};

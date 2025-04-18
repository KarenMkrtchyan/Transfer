import { db } from "./firebaseConfig.ts";
import { doc, getDoc, setDoc } from "firebase/firestore";

async function fetchUserCoursePlan(uid: string) {
  const docSnap = await getDoc(doc(db, "course_plan", uid));
  if (docSnap.exists()) {
    return docSnap.data().courses;
  } else {
    console.warn("creating new user file");
    return [];
  }
}

async function updateUserCoursePlan(uid: string, coursePlan: Object) {
  try {
    await setDoc(doc(db, "course_plan", uid), coursePlan);
    if (import.meta.env.VITE_STATE === "debug") {
      console.log("Document successfully written!");
    }
  } catch (e) {
    console.error("Error writing document: ", e);
  }
}

export { fetchUserCoursePlan, updateUserCoursePlan };

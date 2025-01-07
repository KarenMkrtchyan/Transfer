import { db, auth } from "./firebaseConfig.ts";
import { doc, setDoc } from "firebase/firestore";

async function addSchool(schoolName: string, major: string) {
  // file structure
  /*
  user.uid (collection)
    school (subcollection)
      major1 (document)
      major2 (document)
  */
  try {
    if (auth.currentUser) {
      const newMajor = doc(db, `${auth.currentUser.uid}/${schoolName}`, major);
      await setDoc(newMajor, {
        major: major,
        requiredCourses: [], //TODO: Fetch from Assist.org
        reccomendedCourses: [], //TODO: Fetch from Assist.org
        qualify: 0, // 0 for not qualified, 1 for have required, 2 for have reccomended
      });
    } else {
      console.error("No authenticated user found.");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { addSchool };

import { db, auth } from "./firebaseConfig.ts";
import { collection, doc, getDoc, query, setDoc } from "firebase/firestore";

async function addMajor(schoolName: string, major: string) {
  // file structure
  /*
  user.uid (collection)
    schools (document)
        schoolName (subcollection)
            majorName (document)
            majorName (document)
  */
  try {
    if (auth.currentUser) {
      const newMajor = doc(
        db,
        auth.currentUser.uid,
        "schools",
        schoolName,
        major
      );
      await setDoc(newMajor, {
        major: major,
        requiredCourses: [], //TODO: Fetch from Assist.org
        reccomendedCourses: [], //TODO: Fetch from Assist.org
        qualify: 0, // 0 for not qualified, 1 for have required, 2 for have reccomended
      });
      console.log(`Added ${major} at ${schoolName}`);
    } else {
      console.error("No authenticated user found.");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getSchools() {
  if (auth.currentUser) {
    console.log(
      `User with ID ${auth.currentUser.uid} is trying to fetch schools`
    );
  } else {
    console.error("User not signed in");
    return [];
  }
  const schools:any = []; // fix type to be specific object
  const docRef = doc(db, auth.currentUser.uid, "schools")
  const docSnap = await getDoc(docRef)
  if(docSnap.exists()){
    console.log("Schools document", docSnap.data)
  } else{
    console.warn("User doesn't have schools doc")
  }
  return schools
}

export { addMajor, getSchools };

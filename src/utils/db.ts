import { db, auth } from "./firebaseConfig.ts";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";

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
  console.log("fetching schools");
  const schools = {};
  try {
    if (auth.currentUser) {
      const userSchoolsDoc = doc(db, `${auth.currentUser.uid}/schools`);
      const schoolNamesSnap = await getDocs(
        collection(userSchoolsDoc, "schoolName")
      );
      schoolNamesSnap.forEach((doc) => {
        console.log("someething");
        //console.log(doc.id, " => ", doc.data());
      });

      return schools;
    }
  } catch (e) {
    console.error("User not signed in");
    return [];
  }
}

export { addMajor, getSchools };

import { db, auth } from "./firebaseConfig.ts";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

async function fetchUserFile(uid: string) {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.warn("creating new user file");
    return {};
  }
}

async function addMajor(schoolName: string, major: string) {
  try {
    if (auth.currentUser) {
      const user = await fetchUserFile(auth.currentUser.uid);
      let updatedUser: Object;
      if (Object.keys(user).length === 0) {
        //New users need to be initated not updated
        updatedUser = {
          id: auth.currentUser.uid,
          schools: [
            {
              name: schoolName,
              major: major,
              required_courses: [], //TODO Fetch from Assist
              reccomended_courses: [],
              ge_requirements: [],
            },
          ],
        };
      } else {
        updatedUser = {
          id: user.id,
          schools: [
            ...user.schools,
            {
              name: schoolName,
              major: major,
              required_courses: [], //TODO Fetch from Assist
              reccomended_courses: [],
              ge_requirements: [],
            },
          ],
        };
      }

      await setDoc(doc(db, "users", auth.currentUser.uid), updatedUser);
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
    //TODO redirect user back to sign in page
    console.error("User not signed in");
    return [];
  }
  const schools: any = []; // fix type to be specific object
  const q = await getDoc(doc(db, "users", auth.currentUser.uid));
  if (q.exists()) {
    console.log("schools fetchs correctly");
    const user = await q.data();
    return user.schools;
  } else {
    console.log("school fetch failed");
  }

  return schools;
}

export { addMajor, getSchools };

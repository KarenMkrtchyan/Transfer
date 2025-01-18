import { db, auth } from "./firebaseConfig.ts";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
              qualify: 0,
            },
          ],
        };
      } else {
        updatedUser = {
          id: user.id,
          schools: [
            ...user.schools, //TODO Check if school already exists
            {
              name: schoolName,
              major: major,
              required_courses: [], //TODO Fetch from Assist
              reccomended_courses: [],
              ge_requirements: [],
              qualify: 0,
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

async function addCommunity(schoolName: string) {
  try {
    if (auth.currentUser) {
      const user = await fetchUserFile(auth.currentUser.uid);
      const updatedUser = {
        id: user.id,
        schools: user.schools,
        communityCollage: schoolName,
      };
      await setDoc(doc(db, "users", auth.currentUser.uid), updatedUser); // a lot of data is being overwritten and its not neccesary, look into optimization
      console.log(`Added ${schoolName}`);
    } else {
      console.error("No authenticated user found.");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getSchools() {
  if (auth.currentUser) {
    const user = await fetchUserFile(auth.currentUser.uid);
    return user.schools;
  } else {
    console.error("No authenticated user found.");
    return [];
  }
}

export { addMajor, getSchools, fetchUserFile, addCommunity };

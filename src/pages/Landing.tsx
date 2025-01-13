import { guestLogIn, googleLogIn } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { auth } from "@/utils/firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import getOuttaHere from "../graphics/getOuttaHere.gif";

const LogInInterface = () => {
  const [signInStatus, setSignInStatus] = useState(auth.currentUser);
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      console.log("update UI log in status");
      setSignInStatus(auth.currentUser);
    });
  });
  //TO DO: Have access to the rest of the application blocked when user is not signed in

  if (signInStatus) {
    return (
      <span className="rounded-md flex w-fit items-center gap-2 text-white bg-green-500 px-3 py-1 ">
        <Check />
        <p>Signed In</p>
      </span>
    );
  }
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={googleLogIn}>
        <span className="truncate">Log in with Google</span>
      </Button>
      <Button variant="outline" onClick={guestLogIn}>
        <span className="truncate">Guest</span>
      </Button>
    </div>
  );
};

const Landing = () => {
  return (
  
      <div className="flex flex-col gap-10 px-4 py-10 items-center @container">
        <div className="flex flex-row gap-2 text-left px-5 py-1 space-x-4 justify-evenly items-center @container">
          <div className="flex flex-col gap-2 content-center">
            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
              Transfer like a pro 😎
            </h1>
            <h2 className="text-sm font-normal leading-normal @[480px]:text-base">
           All of your assist articulation agreemtns organized in one place. Log in to start using!
          </h2>
          <LogInInterface />
          </div>           
          <img
              src={getOuttaHere}
              alt="Cute Funny Penguin GIF"
              style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
            />
        </div>
      
        <div className="items-start flex flex-col gap-4">
          <h1 className="text-[#111418] text-[32px] font-bold leading-tight @[480px]:text-4xl max-w-[720px]">
            How to use
          </h1>
      
          <ol  className="list-decimal" type="1" >
            <li>
              Sign in with Google to save your course plan or guest to try it out
            </li>
            <li>
            Add your all the majors at all the UC and CSU school you want to qualify for.
            </li>
            <li>
              Select which required/reccomended course you can take
            </li>
            <li>
              Create an organzied class plan and see if you meet all of your requirements
            </li>
            <li>
              Donate a couple cents to ___ so I can keep the servers going once you get that bag
            </li>
          </ol>
        </div>

      </div>
   
  );
};

export default Landing;

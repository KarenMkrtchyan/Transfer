import { guestLogIn, googleLogIn } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { auth } from "@/utils/firebaseConfig";

const LogInInterface = () => {
  if (auth.currentUser) {
    return (
      <span className="flex items-center gap-2 text-white bg-green-500 px-3 py-1 rounded-full">
        <Check />
        <p>Signed In</p>
      </span>
    );
  }
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={googleLogIn}>
        <span className="truncate">Log in with Google</span>
      </Button>
      <Button variant="secondary" onClick={guestLogIn}>
        <span className="truncate">Guest</span>
      </Button>
    </div>
  );
};

const Landing = () => {
  return (
    <>
      <div
        className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/b80e77ef-6787-4fb6-baa8-eaaff3bf7bce.png")',
        }}
      >
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
            Welcome to the University of California
          </h1>
          <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base">
            A new platform to help you transfer from a California community
            college to UC. Browse transfer requirements, track your progress and
            more.
          </h2>
        </div>
        <LogInInterface />
      </div>

      <div className="flex flex-col gap-10 px-4 py-10 @container">
        <div className="flex flex-col gap-4">
          <h1 className="text-[#111418] text-[32px] font-bold leading-tight @[480px]:text-4xl max-w-[720px]">
            How it works
          </h1>
          <p className="text-[#111418] text-base font-normal leading-normal max-w-[720px]">
            Whether you're just getting started or already on your way, we're
            here to help you every step of the way.
          </p>
        </div>
      </div>
    </>
  );
};

export default Landing;

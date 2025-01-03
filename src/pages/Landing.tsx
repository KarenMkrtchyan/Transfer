import { guestLogIn } from "@/utils/fire";

const guestClick = () => {
  console.log("Guest log in");
  guestLogIn();
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
        <div className="flex flex-wrap gap-3">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#378fe6] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base">
            <span className="truncate">Log in with Google</span>
          </button>
          <button
            onClick={guestClick}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base"
          >
            <span className="truncate">Guest</span>
          </button>
        </div>
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

import { useUser } from "@clerk/clerk-react";

import { BarLoader } from "react-spinners";
import { Button } from "../components/ui/button";

export function Onboarding() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title finbt-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a ...
      </h2>
      <div className="mt-16 grid grid-cols-2 w-full md:px-40">
        <Button variant={"blue"}></Button>
      </div>
    </div>
  );
}

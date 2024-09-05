import { useUser } from "@clerk/clerk-react";

import { BarLoader } from "react-spinners";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Onboarding() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const handleRoleSelection = async (role: string) => {
    await user
      ?.update({ unsafeMetadata: { role } })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-jobs" : "/jobs"
      );
    }
  }, [navigate, user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  console.log(user, "User");

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title finbt-extrabold text-7xl sm:text-8xl tracking-tighter">
        Ich bin ein ...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant={"blue"}
          className="h-32 text-2xl text-gray-900"
          onClick={() => handleRoleSelection("candidate")}
        >
          Kandidat
        </Button>
        <Button
          variant={"green"}
          className="h-32 text-2xl text-gray-900"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
}

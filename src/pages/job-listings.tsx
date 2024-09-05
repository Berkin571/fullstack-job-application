import { getJobs } from "../api/api-jobs";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.hook";
import { useSession, useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

import { Job } from "../types/types";
import { JobCard } from "../components/job-card";

export function JobListings() {
  const { session } = useSession();
  const { isLoaded } = useUser();

  const [showSpinner, setShowSpinner] = useState(true);
  const [location, setLocation] = useState<string | undefined>();
  const [company_id, setCompany_id] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
    error: errorJobs,
  } = useFetch<Job[]>(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded && session) {
      fnJobs();
    }

    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [isLoaded, session]);

  if (errorJobs) {
    return <h1>Error loading jobs: {errorJobs.message}</h1>;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-4xl sm:text-5xl text-center pb-8">
        Aktuelle Stellen
      </h1>

      {loadingJobs || showSpinner ? (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataJobs?.length ? (
            dataJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            ))
          ) : (
            <div>Keine Stellen verfügbar</div>
          )}
        </div>
      )}
    </div>
  );
}

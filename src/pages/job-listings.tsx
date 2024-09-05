/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState, useMemo } from "react";
import { useSession, useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

import { getJobs } from "../api/api-jobs";
import useFetch from "../hooks/useFetch.hook";

import { Job } from "../types/types";

import { JobCard } from "../components/job-card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { getCompanies } from "../api/api-companies";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function JobListings() {
  const { session } = useSession();
  const { isLoaded } = useUser();

  // State for search parameters and spinner control
  const [location, setLocation] = useState<string | undefined>("");
  const [companyId, setCompanyId] = useState<string | undefined>("");
  const [searchQuery, setSearchQuery] = useState<string | undefined>("");

  // Fetch jobs and companies with custom hook
  const {
    fn: fetchJobs,
    data: jobsData,
    loading: loadingJobs,
    error: errorJobs,
  } = useFetch<Job[]>(getJobs, {
    location,
    company_id: companyId,
    searchQuery,
  });

  const { fn: fetchCompanies, data: companies } = useFetch(getCompanies);

  // Fetch companies when user is loaded
  useEffect(() => {
    if (isLoaded) {
      fetchCompanies();
    }
  }, [isLoaded]);

  // Fetch jobs when user session is ready and control the spinner
  useEffect(() => {
    if (isLoaded && session) {
      fetchJobs();
    }
  }, [isLoaded, session, location]);

  useEffect(() => {
    if (searchQuery !== undefined) {
      fetchJobs();
    }
  }, [searchQuery]);

  // Memoized job list rendering
  const jobList = useMemo(() => {
    if (jobsData?.length) {
      return jobsData.map((job) => (
        <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />
      ));
    }
    return <div>Keine Stellen verfügbar</div>;
  }, [jobsData]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search-query");

    if (query) {
      setSearchQuery(query.toString());
    } else {
      setSearchQuery("");
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompanyId("");
    setLocation("");
  };

  // Handle error rendering
  if (errorJobs) {
    return <h1>Error loading jobs: {errorJobs.message}</h1>;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-4xl sm:text-5xl text-center pb-8">
        Aktuelle Stellen
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Suche nach Jobs..."
          name="search-query"
          className="h-full flex-1 px-4 text-md bg-gray-900 text-white no-focus-outline"
        />
        <Button type="submit" className="h-full sm:w-28" variant={"blue"}>
          Suchen
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="bg-gray-900">
            <SelectValue placeholder="Filter mittels Stadt" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900">
            <SelectGroup>
              {jobsData?.map(({ location }) => {
                return (
                  <SelectItem
                    key={location}
                    value={location}
                    className="text-white"
                  >
                    {location}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          className="sm:w-1/2 text-white"
          variant="outline"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {/* Spinner or Jobs List */}
      {loadingJobs ? (
        <BarLoader className="my-5" width={"100%"} color="#36d7b7" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobList}
        </div>
      )}
    </div>
  );
}

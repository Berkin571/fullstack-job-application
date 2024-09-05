import { useUser } from "@clerk/clerk-react";
import { Job } from "../types/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "../hooks/useFetch.hook";
import { saveJob } from "../api/api-jobs";
import { useEffect, useState } from "react";

type JobCardProps = {
  job: Job;
  isMyJob?: boolean;
  savedInit: boolean;
  onJobSaved?: () => void;
};

export const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}: JobCardProps) => {
  const [saved, setSaved] = useState(savedInit);

  const { user } = useUser();

  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch<Job[]>(saveJob as any, {
    alreadySaved: saved,
  });

  useEffect(() => {
    if (savedJob !== undefined && savedJob !== null)
      setSaved(savedJob?.length > 0);
  }, [savedJob]);

  const handleSaveJob = async () => {
    try {
      await fnSavedJob({
        user_id: user?.id,
        job_id: job.id,
      });

      onJobSaved();
      setSaved(!saved);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return (
    <Card className="flex flex-col bg-gray-900">
      <CardHeader className="flex">
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon size={25} className="text-red-700 cursor-pointer" />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && (
            <img
              src={job.company.logo_url}
              alt={`${job.company.name} Logo`}
              className="h-7"
            />
          )}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={25} fill="white" />
            {job.location && <p>{job.location}</p>}
          </div>
        </div>
        <hr />
        <div>
          <p>{job.description.substring(0, job.description.indexOf("."))}</p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant={"secondary"} className="text-white w-full">
            Mehr Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob!}
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" />
            ) : (
              <Heart size={20} stroke="white" />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

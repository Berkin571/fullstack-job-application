import { SupabaseClient } from "@supabase/supabase-js";
import { Job, JobParam, RecruiterParam } from "../types/types";
import supabaseClient from "../utils/supabase";

interface SaveJobData {
  job_id: string;
  user_id: string;
}

interface SaveJobOptions {
  alreadySaved: boolean;
}

// Fetch Jobs
export async function getJobs(
  token: string,
  {
    location,
    company_id,
    searchQuery,
  }: { location?: string; company_id?: string; searchQuery?: string }
) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return [];
  }

  return data as Job[];
}

// Read Saved Jobs
export async function getSavedJobs(token: string) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}

// Read single job
export async function getSingleJob(token: string, { id: job_id }: JobParam) {
  const supabase = await supabaseClient(token);
  const query = supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

export async function saveJob(
  token: string,
  options: SaveJobOptions,
  saveData: SaveJobData
): Promise<any[] | null> {
  const supabase: SupabaseClient = await supabaseClient(token);

  if (options.alreadySaved) {
    // If the job is already saved, remove it
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id)
      .eq("user_id", saveData.user_id); // Ensure the deletion is user-specific

    if (deleteError) {
      console.error("Error removing saved job:", deleteError);
      return null;
    }

    return data;
  } else {
    // If the job is not saved, add it to saved jobs
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error saving job:", insertError);
      return null;
    }

    return data;
  }
}

// job isOpen toggle - (recruiter_id = auth.uid())
export async function updateHiringStatus(
  token: string,
  { id: job_id }: JobParam,
  isOpen: boolean
) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Hiring Status:", error);
    return null;
  }

  return data;
}

// get my created jobs
export async function getMyJobs(
  token: string,
  { id: recruiter_id }: RecruiterParam
) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company: companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

// Delete job
export async function deleteJob(token: string, { id: job_id }: JobParam) {
  const supabase = await supabaseClient(token);

  const { data, error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (deleteError) {
    console.error("Error deleting job:", deleteError);
    return data;
  }

  return data;
}

// post job
export async function addNewJob(token: string, _: any, jobData: any) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}

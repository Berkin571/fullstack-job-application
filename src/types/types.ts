// Generischer Typ für ID-Parameter
export interface IDParam {
  id: string;
}

export type JobParam = IDParam;
export type RecruiterParam = IDParam;

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  company_id: number;
  saved: { id: number }[];
  company: { name: string; logo_url: string };
}

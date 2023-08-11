export interface Report {
  _id: string;
  company_id: string;
  epp: string;
  place: string;
  time: Date;
  admonished: boolean;
  supervisor: string;
}

export interface Report {
  company_id: string;
  epp: string;
  place: string;
  time: Date;
  admonished: boolean;
  supervisor: {
    _id: string;
    name: string;
    surname: string;
  };
}

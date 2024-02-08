export interface Report {
  _id: string;
  ID_area: string;
  ID_Cam: string;
  imageUrls: string[];
  EPPs: string[];
  Reported: boolean;
  Deleted: boolean;
  date: string;
  areaName: string;
}

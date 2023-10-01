import React, { useState, useEffect } from "react";
import { Report } from "../types";
import axios from "axios";

export default function useReports() {
  const [reports, setReports] = useState<Report[]>([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.34:8080/company/650df2be619f40beeecb9c00/incidents`
      );
      console.log(response);
      const transformedReports = response.data.map((report: Report) => ({
        ID_area: report.ID_area,
        ID_Cam: report.ID_Cam,
        imageUrls: report.imageUrls,
        EPPs: report.EPPs,
        Reported: report.Reported,
        Deleted: report.Deleted,
        _id: report._id,
        date: report.date,
        areaName: report.areaName,
      }));

      setReports(transformedReports);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return  reports;
}

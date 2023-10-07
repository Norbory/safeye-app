import React, { useState, useEffect } from "react";
import { Report } from "../types";
import axios from "axios";
import {IP} from "../constantes/secret";

export default function useReports() {
  const [reports, setReports] = useState<Report[]>([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `https://k18gs1mk-8080.brs.devtunnels.ms/company/65199ec6cb4d6bc2da6f49ae/incidents`
      );
      //console.log(response);
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
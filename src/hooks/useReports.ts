import React, { useState, useEffect } from "react";
import { Report } from "../types";
import axios from "axios";
import {IP} from "../constantes/secret";
import { useAuth } from "./useAuth";

export default function useReports() {
  const { business } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `https://apicarranza-b6fd258252ec.herokuapp.com/company/653353956f296017f15e49b9/incidents`
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
import React, { useState, useEffect } from "react";
import { Report } from "../types";
import axios from "axios";
import {IP} from "../constantes/secret";
import { useAuth } from "./useAuth";
import { getcompanyId} from '../utils/AuthUtils';

export default function useReports() {
  const { business } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  const fetchReports = async () => {

    const companyId = await getcompanyId();

    try {
      const response = await axios.get(
        `https://apicarranza-b6fd258252ec.herokuapp.com/company/${companyId}/incidents`,
        {
          responseType: 'stream',
        }
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
import React, { useState, useEffect } from "react";
import { Report } from "../types";
import axios from "axios";
import { useAuth } from "./useAuth";
import { URL, COMPANY_ID } from "../constantes/string";

export default function useReports() {
  const { business } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  const fetchReports = async () => {
  
    try {
      const response = await axios.get(
        `${URL}/company/${COMPANY_ID}/incidents`,
        {
          responseType: 'json', // Cambiar de 'stream' a 'json'
        }
      );
  
      if (Array.isArray(response.data)) {
        // Verificar si response.data es un arreglo
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
          supervisor: report.supervisor,
        }));
        setReports(transformedReports);
      } else {
        // Manejar el caso en que response.data no sea un arreglo
        console.error("Los datos no son un arreglo:", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return  reports;
}
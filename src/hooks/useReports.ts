import { useState, useEffect } from "react";
import { Report } from "../types";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

import { BASE_URL } from "../config";

export default function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const serverUrl = BASE_URL;
  const { company, user } = useAuth();

  const fetchReports = async () => {
    const response = await axios.get(`${serverUrl}/api/reports/${company}`);
    const reports = response.data.map((report: Report) => ({
      ...report,
      time: new Date(report.time),
    }));

    setReports(reports);
  };

  const createReport = async (report: Report) => {
    try {
      // Guardar el reporte en la base de datos con el id del usuario
      console.log("ID del usuario:", user._id);
      const response = await axios.post(`${serverUrl}/api/create-report`, {
        ...report,
        supervisor: user._id,
      });
      const newReport = {
        ...response.data,
        time: new Date(response.data.time),
      };
      setReports([...reports, newReport]);
    } catch (error) {
      console.log("Error al crear el reporte:", error, report);
    }
  };

  useEffect(() => {
    company && fetchReports();
  }, []);

  return { reportList: reports, createReport };
}

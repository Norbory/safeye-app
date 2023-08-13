import React, { useState, useEffect } from "react";
import { Report } from "../types";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

import { BASE_URL } from "../config";

export default function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const serverUrl = BASE_URL;
  const { company } = useAuth();

  const fetchReports = async () => {
    const response = await axios.get(`${serverUrl}/api/reports/${company}`);
    const reports = response.data.map((report: Report) => ({
      ...report,
      time: new Date(report.time),
    }));

    setReports(reports);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return { reportList: reports };
}

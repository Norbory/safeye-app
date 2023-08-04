import React, { useState, useEffect } from "react";
import { Report } from "../types";
import axios from "axios";

export default function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const serverUrl = "http://192.168.1.5:3000";

  const fetchReports = async () => {
    const response = await axios.get(
      `${serverUrl}/api/reports/641631458381e6dbffdc3c51`
    );
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

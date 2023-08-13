import React, { useState, useEffect } from "react";
import { Report } from "../types";
import axios from "axios";

import { BASE_URL } from "../config";

export default function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const serverUrl = BASE_URL;

  const fetchReports = async () => {
    const response = await axios.get(
      `${serverUrl}/api/reports/641631458381e6dbffdc3c51`
      // TODO: Replace the hardcoded company ID with the one from the context
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

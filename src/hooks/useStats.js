import { useEffect, useState } from "react";
import getStats from "../services/backend/getStats";

export default function useStats() {
  const [stats, setStats] = useState({
    invoiceStats: [[], [], [], [], [], [], [], [], [], [], [], []],
    articleStats: {},
  });

  useEffect(() => {
    async function fetchStats() {
      const stats = await getStats();
      setStats(stats);
    }
    fetchStats();
  }, []); // eslint-disable-line

  return [stats];
}

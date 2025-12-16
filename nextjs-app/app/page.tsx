"use client";

import { motion } from "framer-motion";
import KPIGrid from "./components/KPIGrid";
import VisitorsChart from "./components/VisitorsChart";
import ForecastChart from "./components/ForecastChart";
import { apiGet } from "@/app/lib/api";
import { KPI, VisitorsTimeseriesRow } from "@/app/lib/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [visitors, setVisitors] = useState<VisitorsTimeseriesRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);Alterei 

  useEffect(() => {
  async function loadAll(): Promise<void> {
    try {
      const kpiData = await apiGet<KPI[]>("/kpis/timeseries");
      const visitorData = await apiGet<VisitorsTimeseriesRow[]>("/kpis/timeseries");
      console.log("visitorData (tipo) =>", Array.isArray(visitorData), visitorData);

      console.log("kpiData =>", kpiData);
      console.log("visitorData =>", visitorData);

      setKpis(kpiData);
      setVisitors(visitorData);
    } catch (err: any) {
      console.error("API ERROR =>", err);
      setError(err.message || "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }
  loadAll();
}, []);

  if (loading) {
    return <p className="p-10">Carregando Dashboard...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-600 font-semibold">Erro: {error}</p>;
  }

  return (
    <motion.main
      className="p-10 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Tourism Insights Dashboard
      </motion.h1>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.25 },
          },
        }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <KPIGrid kpis={kpis} />
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <VisitorsChart data={visitors} />
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <ForecastChart />
        </motion.div>
      </motion.div>
    </motion.main>
  );
}

import KPIGrid from "./components/KPIGrid";
import VisitorsChart from "./components/VisitorsChart";
import ForecastChart from "./components/ForecastChart";
import { apiGet, apiPost } from "@/app/lib/api";

export default async function Dashboard() {
  const kpis = await apiGet("/analytics/kpis/latest");
  const visitors = await apiGet("/analytics/kpis/timeseries");
  const forecast = await apiGet("/forecast/tourism?country=Argentina");

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Tourism Insights Dashboard</h1>

      {/* KPIs */}
      <KPIGrid kpis={kpis} />

      {/* Visitantes por dia */}
      <VisitorsChart data={visitors} />

      {/* Previsão Prophet */}
      <ForecastChart data={forecast} />
    </main>
  );
}

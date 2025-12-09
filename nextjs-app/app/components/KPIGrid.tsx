import KPICard from "./KPICard";

export default function KPIGrid({ kpis }: any) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KPICard title="Total Visitantes" value={kpis.total_visitors} />
            <KPICard title="Crescimento %" value={kpis.growth + '%'} />
            <KPICard title="Top Cidade" value={kpis.top_city} subtitle={kpis.top_city_visitors + " visitantes"} />
        </div>
    );
}

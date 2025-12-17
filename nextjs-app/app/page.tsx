"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import {
    getVisitorsTimeseries,
    VisitorsTimeseriesRow,
} from "./lib/api";

export default function DashboardPage() {
    const [months, setMonths] = useState<number>(12);
    const [data, setData] = useState<VisitorsTimeseriesRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);

                const result = await getVisitorsTimeseries(months);

                // Proteção contra payload inválido
                if (!Array.isArray(result)) {
                    throw new Error("Formato de dados inválido da API");
                }

                setData(result);
            } catch (err: any) {
                setError(err.message || "Erro ao carregar dados");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [months]);

    return (
        <div style={{ padding: 24 }}>
            <h1 style={{ fontSize: 24, marginBottom: 16 }}>
                Tourism Insights Dashboard
            </h1>

            {/* ===== Seletor de período ===== */}
            <div style={{ marginBottom: 16 }}>
                <label style={{ marginRight: 8 }}>
                    Período:
                </label>
                <select
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                >
                    <option value={6}>Últimos 6 meses</option>
                    <option value={12}>Últimos 12 meses</option>
                    <option value={24}>Últimos 24 meses</option>
                    <option value={36}>Últimos 36 meses</option>
                </select>
            </div>

            {/* ===== Estados ===== */}
            {loading && <p>Carregando dados...</p>}
            {error && <p style={{ color: "red" }}>Erro: {error}</p>}

            {!loading && !error && (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="visitors"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

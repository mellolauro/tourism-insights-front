"use client";

import { useEffect, useState } from "react";
import { apiPost } from "@/app/lib/api";
import { motion } from "framer-motion";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Area,
    Legend,
    ResponsiveContainer
} from "recharts";
import { ForecastResponse } from "../lib/types";

// Tipos necessários para evitar o erro do res unknown
type HistoryItem = {
    date: string;
    value: number;
};

type ForecastItem = {
    date: string;
    value: number;
    lower: number;
    upper: number;
};

type ApiResponse = {
    history: HistoryItem[];
    forecast: ForecastItem[];
};

interface CombinedRow {
    date: string;
    history: number | null;
    forecast: number | null;
    lower: number | null;
    upper: number | null;
}

export default function ForecastChart() {
    const [data, setData] = useState<CombinedRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function load() {

        const res: ForecastResponse = await apiPost("/forecast", {
            metric: "visitors",
            periods: 30
        });

        if (!res?.history || !res?.forecast) {
            console.error("Resposta inesperada da API:", res);
            setData([]);
            setLoading(false);
            return;
        }

        const combined = [
            ...res.history.map(h => ({
                date: h.date,
                history: h.value,
                forecast: null,
                lower: null,
                upper: null
            })),
            ...res.forecast.map(f => ({
                date: f.date,
                history: null,
                forecast: f.value,
                lower: f.lower,
                upper: f.upper
            }))
        ];

        setData(combined);
        setLoading(false);
    }

    load();
}, []);

    if (loading) return <p>Carregando previsão...</p>;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-4 rounded-xl shadow-md"
        >
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold mb-4"
            >
                Previsão de Visitantes (30 dias)
            </motion.h2>

            <LineChart width={900} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />
                <YAxis />

                <Tooltip />
                <Legend />

                {/* Faixa de incerteza */}
                <Area
                    type="monotone"
                    dataKey="upper"
                    stroke="none"
                    fillOpacity={0.15}
                    fill="#888"
                />

                {/* Linha histórica */}
                <Line
                    type="monotone"
                    dataKey="history"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                />

                {/* Linha de forecast */}
                <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#16a34a"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                />
            </LineChart>
        </motion.div>
    );
}

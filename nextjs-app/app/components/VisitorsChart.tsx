"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { VisitorsTimeseriesRow } from "@/app/lib/types";

type VisitorsChartProps = {
    data: VisitorsTimeseriesRow[];
};

export default function VisitorsChart({ data }: VisitorsChartProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-white border rounded-xl shadow mt-6"
        >
            <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4 text-xl font-semibold"
            >
                Visitantes por Dia
            </motion.h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
}
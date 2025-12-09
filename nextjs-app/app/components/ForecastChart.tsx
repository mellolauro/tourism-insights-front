"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ForecastChart({ data }: any) {
    return (
        <div className="p-4 bg-white border rounded-xl shadow mt-6">
            <h2 className="mb-4 text-xl font-semibold">Previsão (Prophet)</h2>

        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="prediction" stroke="#059669" strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    </div>
    );
}

"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function VisitorsChart({ data }: any) {
    return (
        <div className="p-4 bg-white border rounded-xl shadow mt-6">
        <h2 className="mb-4 text-xl font-semibold">Visitantes por Dia</h2>

        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visitors" stroke="#2563eb" strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>
    </div>
    );
}

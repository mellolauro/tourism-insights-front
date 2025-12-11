"use client";

import { motion } from "framer-motion";

export default function KPICard({ label, value }: { label: string; value: string | number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow rounded-xl p-4 flex flex-col cursor-default"
        >
            <span className="text-gray-500 text-sm">{label}</span>
            <span className="text-2xl font-bold mt-2">{value}</span>
        </motion.div>
    );
}

import { motion } from "framer-motion";
import KPICard from "./KPICard";
import { KPI } from "@/app/lib/types";

export default function KPIGrid({ kpis }: any) {
    return (
        <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: 0.15 }
                }
            }}
        >
            {kpis.map((k: any, i: number) => (
                <KPICard key={i} label={k.label} value={k.value} />
            ))}
        </motion.div>
    );
}
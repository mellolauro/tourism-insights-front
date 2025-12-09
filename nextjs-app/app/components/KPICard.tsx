export default function KPICard({ title, value, subtitle }: any) {
    return (
        <div className="p-4 rounded-xl shadow bg-white border">
            <h2 className="text-gray-600 text-sm">{title}</h2>
            <p className="text-3xl font-bold mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
    );
}

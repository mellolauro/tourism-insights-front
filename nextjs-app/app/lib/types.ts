// ---------- KPIs ----------
export interface KPI {
    label: string;
    value: number | string;
}

// ---------- Time Series ----------
export interface VisitorsTimeseriesRow {
    date: string;
    visitors: number;
}

// ---------- Forecast ----------
export interface HistoryRow {
    date: string;
    value: number;
}

export interface ForecastRow {
    date: string;
    value: number;
    lower: number;
    upper: number;
}

export interface ForecastResponse {
    history: HistoryRow[];
    forecast: ForecastRow[];
}

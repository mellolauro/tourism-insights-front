export const isServer = typeof window === "undefined";

const API_BASE_EXTERNAL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

function cleanPathHelper(path: string) {
    return path.replace(/^\//, "");
}

function buildUrl(path: string) {
    const clean = cleanPathHelper(path);

    const base = isServer
        ? process.env.INTERNAL_API_URL || API_BASE_EXTERNAL
        : API_BASE_EXTERNAL;

    if (!base) {
        console.error("API_BASE_URL não está definido no ambiente.");
        return "/invalid-url";
    }

    return `${base.replace(/\/$/, "")}/${clean}`;
}

/* =========================
    GET (SEM credentials)
   ========================= */
export async function apiGet<T>(path: string): Promise<T> {
    const url = buildUrl(path);

    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status} - ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}

/* =========================
    POST (SEM credentials)
   ========================= */
export async function apiPost<T>(path: string, body: any): Promise<T> {
    const url = buildUrl(path);

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`Erro na API (${res.status}): ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}

export const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * GET tipado
 */
export async function apiGet<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
    cache: "no-cache",
    });

    if (!res.ok) {
    throw new Error(`Erro na API (${res.status}): ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}

/**
 * POST tipado
 */
export async function apiPost<T, B = unknown>(path: string, body: B): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    });

    if (!res.ok) {
    throw new Error(`Erro na API (${res.status}): ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}

const isServer = typeof window === "undefined";

function buildUrl(path: string) {
    const cleanPath = path.replace(/^\//, "");

    const base = isServer
        ? process.env.INTERNAL_API_URL         // server side
        : process.env.NEXT_PUBLIC_API_URL;     // client side

    return `${base?.replace(/\/$/, "")}/${cleanPath}`;
}

export async function apiGet<T>(path: string): Promise<T> {
    const url = buildUrl(path);
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Erro na API (${res.status}): ${res.statusText}`);
    }

    return res.json();
}

export async function apiPost<T>(path: string, body: any): Promise<T> {
    const url = buildUrl(path);

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`Erro na API (${res.status}): ${res.statusText}`);
    }

    return res.json();
}

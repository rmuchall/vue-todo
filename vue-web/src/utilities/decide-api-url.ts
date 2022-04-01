export function decideApiUrl(): string {
    let apiUrl: string;
    if (process.env["API_OVERRIDE_URL"]) {
        apiUrl = process.env["API_OVERRIDE_URL"];
    } else {
        apiUrl = `${new URL(window.location.href).origin}/api`;
    }

    return apiUrl;
}

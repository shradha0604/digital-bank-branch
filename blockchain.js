export function sha256(message) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(message))
        .then(buffer => Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2,"0")).join(""));
}

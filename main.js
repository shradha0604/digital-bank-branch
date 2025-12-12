// ====================
// MAIN SCREEN LOADER
// ====================
// Load Dashboard on startup
loadScreen("dashboard");

// Load AI assistant overlay
setTimeout(() => {
    loadScreen("assistant");
}, 400);

// Load a screen into <main id="app">
// Special rule: "assistant" is an overlay and does NOT load inside app.
export async function loadScreen(name) {
    try {
        // AI Assistant (overlay) gets added directly to the body
        if (name === "assistant") {
            const res = await fetch(`components/assistant.html`);
            const html = await res.text();
            document.body.insertAdjacentHTML("beforeend", html);
            return; 
        }

        // Normal screen handling
        const res = await fetch(`components/${name}.html`);

        if (!res.ok) {
            document.getElementById("app").innerHTML =
                `<p style="padding:20px; color:#ff5b5b;">
                    Cannot GET /components/${name}.html
                 </p>`;
            return;
        }

        const html = await res.text();
        document.getElementById("app").innerHTML = html;

    } catch (err) {
        console.error("Screen Load Error:", err);
        document.getElementById("app").innerHTML =
            `<p style="padding:20px; color:#ff5b5b;">
                Error loading ${name}. Please check console.
             </p>`;
    }
}



// ====================
// NAVIGATION HANDLING
// ====================

// Buttons in header with: <button data-screen="dashboard">
document.querySelectorAll("nav button").forEach(btn => {
    btn.addEventListener("click", () => {
        const screen = btn.dataset.screen;
        loadScreen(screen);
    });
});



// ====================
// INITIAL APP LOAD
// ====================

// Load Dashboard on startup
loadScreen("dashboard");

// Load the AI assistant overlay after everything initializes
setTimeout(() => {
    loadScreen("assistant");
}, 400);


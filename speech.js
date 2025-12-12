// ============================================
//  TEXT-TO-SPEECH (TTS)
// ============================================

// Speak text in the selected language
export function speak(message, lang = "en-US") {
    try {
        const utter = new SpeechSynthesisUtterance(message);
        utter.lang = lang;

        // Slight adjustments for more natural sound
        utter.rate = 1;
        utter.pitch = 1;
        utter.volume = 1;

        speechSynthesis.cancel(); // Stop anything currently speaking
        speechSynthesis.speak(utter);

    } catch (err) {
        console.warn("TTS not supported:", err);
    }
}



// ============================================
//  SPEECH-TO-TEXT (STT)
// ============================================

// Start listening for voice input
// Returns a Promise that resolves with the spoken text
export function listen(lang = "en-US") {
    return new Promise((resolve, reject) => {

        // Check browser support
        const SpeechRec =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition ||
            window.mozSpeechRecognition ||
            window.msSpeechRecognition;

        if (!SpeechRec) {
            reject("Speech recognition not supported.");
            return;
        }

        const rec = new SpeechRec();
        rec.lang = lang;
        rec.interimResults = false;
        rec.maxAlternatives = 1;

        rec.start();

        rec.onresult = (e) => {
            const text = e.results[0][0].transcript;
            resolve(text);
        };

        rec.onerror = (err) => {
            console.error("Speech Recognition Error:", err);
            reject(err);
        };

        rec.onend = () => {
            // Auto-stop behavior handled by browser
        };
    });
}

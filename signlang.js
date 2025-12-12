// ===========================================================
// REAL SIGN LANGUAGE DETECTION MODULE USING MEDIAPIPE HANDS
// ===========================================================

let hands = null;
let camera = null;

let latestGesture = null;

// Predefined gestures (you can add more)
const gestureMap = {
    "OPEN_HAND": "Help",
    "FIST": "Stop",
    "POINT": "Withdraw",
    "VICTORY": "Yes",
    "THUMB_UP": "Good"
};


// ================================
// Initialize the Hand Detector
// ================================
export async function initSignLanguage() {

    // Create the Hands model
    hands = new Hands({
        locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
        maxNumHands: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.6
    });

    hands.onResults(onHandsResults);

    // Create webcam feed
    const videoEl = document.createElement("video");
    videoEl.style.display = "none";
    document.body.appendChild(videoEl);

    camera = new Camera(videoEl, {
        onFrame: async () => {
            await hands.send({ image: videoEl });
        },
        width: 640,
        height: 480
    });

    camera.start();

    console.log("Sign language detector initialized.");
}



// =================================
// Handle HAND LANDMARKS → gesture
// =================================
function onHandsResults(results) {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
        latestGesture = null;
        return;
    }

    const landmarks = results.multiHandLandmarks[0];

    // Simple rule-based detection  
    latestGesture = detectGesture(landmarks);
}



// ======================================
// BASIC GESTURE CLASSIFIER (RULE-BASED)
// ======================================
function detectGesture(landmarks) {

    // Example rules:

    // OPEN HAND → HELP
    const spread = distance(landmarks[4], landmarks[20]);
    if (spread > 0.35) return gestureMap.OPEN_HAND;

    // FIST → STOP
    const fist = distance(landmarks[4], landmarks[8]);
    if (fist < 0.05) return gestureMap.FIST;

    // POINT → WITHDRAW
    const indexStraight = landmarks[8].y < landmarks[7].y;
    const otherFingers = landmarks[12].y > landmarks[11].y && landmarks[16].y > landmarks[15].y;
    if (indexStraight && otherFingers) return gestureMap.POINT;

    // VICTORY → YES
    const victory = landmarks[8].y < landmarks[7].y && landmarks[12].y < landmarks[11].y;
    if (victory) return gestureMap.VICTORY;

    // THUMB UP → GOOD
    const thumbUp = landmarks[4].y < landmarks[3].y;
    if (thumbUp) return gestureMap.THUMB_UP;

    return null;
}



// ======================================
// DISTANCE HELPER FUNCTION
// ======================================
function distance(a, b) {
    return Math.sqrt(
        (a.x - b.x) ** 2 +
        (a.y - b.y) ** 2 +
        (a.z - b.z) ** 2
    );
}



// ======================================
// Public function to get detected gesture
// ======================================
export function getGesture() {
    return latestGesture;
}

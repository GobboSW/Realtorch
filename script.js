const onButton = document.getElementById('on-button');
const offButton = document.getElementById('off-button');
let track;

async function turnOnFlashlight() {
    if (!track) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            track = stream.getVideoTracks()[0];
            await track.applyConstraints({
                advanced: [{ torch: true }]
            });
        } catch (e) {
            console.error(e);
        }
    }
}

function turnOffFlashlight() {
    if (track) {
        track.stop();
        track = null;
    }
}

onButton.addEventListener('click', turnOnFlashlight);
offButton.addEventListener('click', turnOffFlashlight);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

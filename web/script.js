const clock = $('.clock').FlipClock({
    clockFace: 'TwelveHourClock',
    showSeconds: false
});

function openFullscreen() {
  const elem = document.documentElement; // whole page

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

// Call openFullscreen() on user interaction, e.g., a button click
document.getElementById('fullscreenBtn').addEventListener('click', openFullscreen);

window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo(0, 1);
  }, 0);
});

// awake code

let wakeLock = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock?.request('screen');
    wakeLock?.addEventListener('release', () => {
      console.log('Wake Lock was released');
    });
    console.log('Wake Lock is active');
  } catch (err) {
    console.error('Wake Lock error:', err);
  }
}

function requestFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function startClock() {
  const clock = document.getElementById('clock');
  setInterval(() => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

function initClockApp() {
  document.getElementById('startButton').style.display = 'none';
  requestFullscreen();
  requestWakeLock();
  startClock();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startButton').addEventListener('click', initClockApp);
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    requestWakeLock();
  }
});

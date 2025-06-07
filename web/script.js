const clock = $('.clock').FlipClock({
    clockFace: 'TwelveHourClock',
    showSeconds: false
});

// Removed openFullscreen and fullscreenBtn logic

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

function initClockApp() {
  document.getElementById('startButton').style.display = 'none';
  requestFullscreen(); // Request fullscreen on user gesture
  requestWakeLock();
  // No need to call startClock or update #clock manually
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startButton').addEventListener('click', initClockApp);
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    requestWakeLock();
  }
});

// Remove fullscreenBtn from HTML as well (do this in index.html)

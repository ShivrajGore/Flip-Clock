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
  const btn = document.getElementById('startButton');
  btn.classList.add('vanish');
  setTimeout(() => {
    btn.style.display = 'none';
  }, 400); // matches the CSS transition duration
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

document.getElementById('themeToggle').addEventListener('click', function() {
  const body = document.body;
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    this.textContent = 'Switch Theme';
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    this.textContent = 'Switch Theme';
  }
});

// On load, set dark mode as default
window.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('dark-mode');
});

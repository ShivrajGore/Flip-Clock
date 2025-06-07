const clock = $('.clock').FlipClock({
    clockFace: 'TwelveHourClock',
    showSeconds: false
});

window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo(0, 1);
  }, 0);
});

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
  requestFullscreen();
  requestWakeLock();
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

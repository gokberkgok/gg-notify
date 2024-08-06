//gokberkk_
document.addEventListener('DOMContentLoaded', () => {
  const notifyDiv = document.querySelector('.notify');
  const progressBar = document.getElementById('myBar');
  const progressBar2 = document.getElementById('myProgress');
  let currentNotification = null;
  let queue = [];
  
  window.addEventListener('message', (event) => {
    if (event.data.type === 'gg:notify') {
      const message = event.data.message;
      const type = event.data.notificationType;
      const duration = event.data.duration;

      if (currentNotification) {
        queue.push({ message, type, duration });
      } else {
        showNotification(message, type, duration);
      }
    }
  });

  function showNotification(message, type, duration) {
    notifyDiv.classList.remove('info', 'error', 'success');
    notifyDiv.classList.add(type);
    notifyDiv.style.display = 'block';
    notifyDiv.querySelector('.notifyMain').style.color = getTextColor(type);
    notifyDiv.querySelector('.progresbar').style.color = getTextColor(type);
    notifyDiv.querySelector('.lowerText').textContent = message;

    progressBar.style.width = '0%';
    $(notifyDiv).stop().css('opacity', 0).animate({ opacity: 1 }, 500);

    currentNotification = {
      timeout: setTimeout(() => {
        hideNotification();
        if (queue.length > 0) {
          const { message, type, duration } = queue.shift();
          showNotification(message, type, duration);
        }
      }, duration)
    };

    animateProgressBar(duration);
  }

  function hideNotification() {
    $(notifyDiv).stop().animate({ opacity: 0 }, 500, () => {
      notifyDiv.style.display = 'none';
      progressBar.style.width = '0%';
      currentNotification = null;
    });
  }

  function animateProgressBar(duration) {
    const progressElement = $(progressBar);
    progressElement.css('width', '0%');
    const startTime = Date.now();
    let currentProgress = 0;

    function updateProgress() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = (elapsedTime / duration) * 100;

      if (progress <= 100) {
        const increment = progress - currentProgress;
        currentProgress = progress;
        progressElement.css('width', `${progress}%`);
        requestAnimationFrame(updateProgress);
      } else {
        progressElement.css('width', '100%');
      }
    }

    updateProgress();
  }

  function getTextColor(type) {
    switch (type) {
      case 'info':
        return '#e9f037';
      case 'error':
        return '#d45065';
      case 'success':
        return '#70d44e';
      default:
        return '#ffffff';
    }
  }
});
//Gökberk#3151

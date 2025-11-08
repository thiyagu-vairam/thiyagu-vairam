window.addEventListener("scroll", function () {
    const navbar = document.getElementById("mainNavbar");
    if (window.scrollY > 10) {
        navbar.classList.add("shadow-sm");
    } else {
        navbar.classList.remove("shadow-sm");
    }
});

/**/
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".benefit-card");
    const gifs = document.querySelectorAll(".gif-placeholder");

    function setActive(card) {
      // remove active from all cards
      cards.forEach(c => c.classList.remove("active"));
      // add active to clicked card
      card.classList.add("active");

      // hide all gifs
      gifs.forEach(g => g.classList.remove("active"));
      // show related gif
      const gifId = card.getAttribute("data-gif");
      document.getElementById(gifId).classList.add("active");
    }

    // init default (farmers)
    setActive(document.querySelector('.benefit-card[data-gif="farmers"]'));

    // add click event
    cards.forEach(card => {
      card.addEventListener("click", () => setActive(card));
    });
  });

/*video*/
  // (function(){
  //   const video = document.getElementById('kisanVideo');
  //   const playBtn = document.getElementById('playBtn');

  //   // toggle play/pause
  //   function togglePlay() {
  //     if (video.paused) {
  //       const p = video.play();
  //       if (p !== undefined) {
  //         p.then(() => {
  //           // played successfully
  //         }).catch(err => {
  //           console.warn('Autoplay/play prevented:', err);
  //         });
  //       }
  //     } else {
  //       video.pause();
  //     }
  //   }
  (function(){
  const video = document.getElementById('kisanVideo');
  const playOverlay = document.getElementById('playBtn');
  const playPause = document.getElementById('playPause');
  const progressBar = document.getElementById('progressBar');
  const muteBtn = document.getElementById('muteBtn');
  const fullScreen = document.getElementById('fullScreen');

  // Play overlay click
  playOverlay.addEventListener('click', () => {
    video.play();
    playOverlay.style.display = 'none';
    playPause.innerHTML = '<i class="fa fa-pause"></i>';
  });

  // Toggle play/pause
  playPause.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPause.innerHTML = '<i class="fa fa-pause"></i>';
      playOverlay.style.display = 'none';
    } else {
      video.pause();
      playPause.innerHTML = '<i class="fa fa-play"></i>';
      playOverlay.style.display = 'block';
    }
  });

  // Update progress bar as video plays
  video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.value = percent;
  });

  // Seek video when user moves progress bar
  progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * video.duration;
    video.currentTime = seekTime;
  });

  // Mute/unmute
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted ? '<i class="fa fa-volume-mute"></i>' : '<i class="fa fa-volume-up"></i>';
  });

  // Fullscreen toggle
  fullScreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      video.requestFullscreen();
      fullScreen.innerHTML = '<i class="fa fa-compress"></i>';
    } else {
      document.exitFullscreen();
      fullScreen.innerHTML = '<i class="fa fa-expand"></i>';
    }
  });

  // Reset play button when ended
  video.addEventListener('ended', () => {
    playPause.innerHTML = '<i class="fa fa-play"></i>';
    playOverlay.style.display = 'block';
  });


    // update overlay visibility based on video state
    function updateButton() {
      if (video.paused) {
        playBtn.classList.remove('hidden');
        playBtn.setAttribute('aria-label', 'Play video');
      } else {
        playBtn.classList.add('hidden');
        playBtn.setAttribute('aria-label', 'Pause video');
      }
    }

    // wire events
    playBtn.addEventListener('click', function(e){
      e.stopPropagation(); // prevent video click double-toggle
      togglePlay();
    });

    // allow clicking the video area to play/pause
    video.addEventListener('click', togglePlay);

    // ensure button visibility follows play/pause
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('ended', function(){
      // if loop is off and video ends, show the button again
      updateButton();
    });

    // initialize state on load
    document.addEventListener('DOMContentLoaded', updateButton);
    // in case video metadata loads after DOMContentLoaded
    video.addEventListener('loadedmetadata', updateButton);
  })();
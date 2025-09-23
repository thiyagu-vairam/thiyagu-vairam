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
  (function(){
    const video = document.getElementById('kisanVideo');
    const playBtn = document.getElementById('playBtn');

    // toggle play/pause
    function togglePlay() {
      if (video.paused) {
        const p = video.play();
        if (p !== undefined) {
          p.then(() => {
            // played successfully
          }).catch(err => {
            console.warn('Autoplay/play prevented:', err);
          });
        }
      } else {
        video.pause();
      }
    }

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
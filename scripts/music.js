document.addEventListener('DOMContentLoaded', function() {
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progressBar = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const albumArts = document.querySelectorAll('.album-art');
    
    let isPlaying = false;
    
    // Sample functionality
    playPauseBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        this.textContent = isPlaying ? '❚❚' : '▶';
    });
    
    prevBtn.addEventListener('click', function() {
        // move to previous track logic
        rotateAlbums(-1);
    });
    
    nextBtn.addEventListener('click', function() {
        // move to  next track logic
        rotateAlbums(1);
    });
    
    // Album carousel rotation
    function rotateAlbums(direction) {
        const albums = Array.from(albumArts);
        const currentIndex = albums.findIndex(album => album.classList.contains('active'));
        
        albums[currentIndex].classList.remove('active');
        
        let newIndex = (currentIndex + direction + albums.length) % albums.length;
        albums[newIndex].classList.add('active');
    }
    
    // Progress bar update (simulated)
    if (progressBar) {
        setInterval(() => {
            if (isPlaying && progressBar.value < 100) {
                progressBar.value += 0.5;
                currentTimeEl.textContent = formatTime(progressBar.value / 100 * 240);
            }
        }, 1000);
    }
    
    durationEl.textContent = formatTime(240); // song duration is 4 minutes
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
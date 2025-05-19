const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progressBar = document.getElementById("progressBar");
const songList = Array.from(document.querySelectorAll(".music-list-li"));
const currentSong = document.getElementById("currentSong");

let currentIndex = 0;


function loadSong(index) {
    const song = songList[index];
    const src = song.getAttribute("data-src");
    audio.src = src;
    audio.play();
    currentSong.innerText = "Now Playing: " + song.innerText;
    playPauseBtn.innerText = "⏸";
    currentIndex = index;
}


songList.forEach((song, index) => {
    song.addEventListener("click", () => {
        loadSong(index);
    });
});


playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerText = "⏸";
    } else {
        audio.pause();
        playPauseBtn.innerText = "▶";
    }
});


nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songList.length;
    loadSong(currentIndex);
});


prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songList.length) % songList.length;
    loadSong(currentIndex);
});


audio.addEventListener("timeupdate", () => {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
});


progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
});
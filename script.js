const musicContainer = document.getElementById("music-cont");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-cont");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const mainContainer = document.getElementById("main-container");
const modeBtn = document.getElementById("change-mode");
const darkMode = document.getElementById("mode2");
const lightMode =document.getElementById("mode1");

//for switching dark and lihgt mode
modeBtn.addEventListener("click", () => {
    mainContainer.classList.toggle("dark");
    if(lightMode.classList.contains("inactive-mode")){
        lightMode.classList.remove("inactive-mode");
        darkMode.classList.add("inactive-mode");
    }
    else{
        lightMode.classList.add("inactive-mode");
        darkMode.classList.remove("inactive-mode");
    }
});

//song titles
const songs = ["Ik Vaari Aa", "Pal-Whistle", "Raabta(Title Track)", "Nasheeli Aankhein", "Khamosiyan", "Saaware", "Pal Ek Pal"];
let songIndex = 0;
//function to load the song
loadSong(songs[songIndex]);
function loadSong(song) {
    title.innerText = song;
    audio.src = `./music/${song}.mp3`;
}
//function to play song 
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fa").classList.remove("fa-play");
    playBtn.querySelector("i.fa").classList.add("fa-pause");
    audio.play();
}
//function to pause currently playing song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fa").classList.remove("fa-pause");
    playBtn.querySelector("i.fa").classList.add("fa-play");
    audio.pause();
}
//function to play previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//function to play next song 
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//function to update the progress bar 
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPerCent = (currentTime / duration) * 100;
    progress.style.width = `${progressPerCent}%`;
}
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
//eventlistner when we click on play/pause button it checks wether the 
//song is in playing state or pause and perform task accordingly
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

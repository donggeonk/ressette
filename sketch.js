var rate, playing, swapRate, pauseRate;
var songs = [];

function preload() {
  songs.push(loadSound("M83-'Midnight-City'-Official-video.mp3"));
  songs.push(loadSound("Circus-Theme-Song-3.mp3"));
  songs.push(loadSound("Luis-Fonsi-Despacito-ft.-Daddy-Yankee.mp3"));
}

function prevSong() {
  currentSong = abs((currentSong - 1) % songs.length);
  songs[currentSong].jump(songs[currentSong].duration());
}

function nextSong() {
  currentSong = abs((currentSong + 1) % songs.length);
  songs[currentSong].play();
}

function setup() {
  createCanvas(400, 800);
  rate = 1.0;
  pauseRate = 0;
  currentSong = -1;
  nextSong(); 
}

function keyReleased() {
  if (keyCode == 37) {
    rate -= 0.1;
  }
  
  if (keyCode == 39) {
    rate += 0.1;
  }
  
  if (keyCode == 40) {
    rate *= -1.0;
  }
  
  if (keyCode == 38) {
    rate *= 1.1;
  }
}

function draw() {
    //rate = map(0, mouseY, height, -3.0, 3.0);
    songs[currentSong].rate(rate);
    if (!songs[currentSong].isPlaying() && songs[currentSong].isLoaded() && rate > 0) {
        nextSong();
    }
    if (!songs[currentSong].isPlaying() && songs[currentSong].isLoaded() && rate < 0) {
        prevSong();
    }
}

function toggleSong() {
    swapRate = rate;
    rate = pauseRate;
    pauseRate = swapRate;
    songs[currentSong].rate(rate);
}

document.addEventListener("DOMContentLoaded", () => {
    // const rotateBottomWheel = document.querySelector("#bottomWheel");
    // const rotateTopWheel = document.querySelector("#topWheel");

    // document.querySelector("#playB").addEventListener("click", e => {
    //     e.preventDefault();

    //     rotateBottomWheel.classList.add("form--hidden");
    //     createAccountForm.classList.remove("form--hidden");
    // });

    // console.log("sdflkjadf")

    // Perform AJAX/Fetch login
    // playSong.addEventListener("submit", e => {
    //     e.preventDefault();

    //     console.log("play")

    //     songs[currentSong].play();
    // });
})
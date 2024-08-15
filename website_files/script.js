let progress=document.getElementById("progress");
let song=document.getElementById("song");
let control_icon=document.getElementById("control_icon");
let timeDisplay = document.getElementById("time-display");
let interval;
let menuIcon = document.getElementById("menu-icon");
let dropdownMenu = document.getElementById("dropdown-menu");
const audio = document.getElementById('song'); 
const circleWave = document.getElementById('circle-wave');
const circles = circleWave.querySelectorAll('div');
let isRepeating = false; 
let isLinearPathActive = true; 

playPause();

audio.addEventListener('play', () => {
    circles.forEach(circle => {
        circle.style.display = 'block';
    });
});

audio.addEventListener('pause', () => {
    circles.forEach(circle => {
        circle.style.display = 'none';
    });
});

menuIcon.addEventListener("click", function() {
    if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
});

function handleOptionClick(option) {
    if(option=="AFTERLIFE"){
        window.location.replace("index1.html");
    }
    else if(option=="Mao6ini"){
        window.location.replace("index2.html");
    }
    else if(option=="Summer"){
        window.location.replace("index3.html");
    }
    
    dropdownMenu.style.display = "none"; 
}

song.onloadedmetadata=function(){
    progress.max=song.duration;
    progress.value=song.currentTime;
    updateTimeDisplay();
}


function playPause(){
    let controlIcon = document.getElementById("control_icon");

    if (song.paused) {
        song.play();
        controlIcon.src = "icon/pause.png";
        interval = setInterval(updateProgress, 500);
    } else {
        song.pause();
        controlIcon.src = "icon/play_white.png";
        clearInterval(interval);
    }
}


function updateProgress() {
    progress.value = song.currentTime;
    updateTimeDisplay();
}

progress.oninput = function() {
    song.currentTime = progress.value;
    updateTimeDisplay();
}

progress.onchange = function() {
    if (song.paused) {
        song.play();
        interval = setInterval(updateProgress, 500);
        control_icon.src = "icon/pause.png";
    }
}

function updateTimeDisplay() {
    let currentTime = formatTime(song.currentTime);
    let totalTime = formatTime(song.duration);
    timeDisplay.textContent = `${currentTime} / ${totalTime}`;
}

// when song end
song.addEventListener('ended', function() {
    control_icon.src = "icon/play_white.png";
    clearInterval(interval); 
});

function repeatSong(option) {
    const repeatIcon = document.querySelector('.extra_controls div:nth-child(1) img');
    const linearPathIcon = document.querySelector('.extra_controls div:nth-child(2) img');
    const linearPathButton = document.querySelector('.extra_controls div:nth-child(2)');

    if (isRepeating) {
        song.loop = false; 
        repeatIcon.src = "icon/repeat.png"; 
        isRepeating = false;

        
        linearPathButton.onclick = function linearPath() {
            const linearPathIcon = document.querySelector('.extra_controls div:nth-child(2) img');
        
            if (isLinearPathActive) {
                song.removeEventListener('ended', nextSong); 
                linearPathIcon.src = "icon/close_linear_path.png"; 
                isLinearPathActive = false;
            } else {
                song.addEventListener('ended', nextSong); 
                linearPathIcon.src = "icon/linear_path.png"; 
                isLinearPathActive = true;
            }
        };

        linearPathIcon.style.cursor = 'pointer';
    } else {
        song.loop = true; 
        if(option=="index1"){
            repeatIcon.src = "icon/repeat_red.png"; 
        }
        else if(option=="index2"){
            repeatIcon.src = "icon/repeat_green.png"; 
        }
        else if(option=="index3"){
            repeatIcon.src = "icon/repeat_blue.png"; 
        }
        
        isRepeating = true;

        song.removeEventListener('ended', nextSong); 
        linearPathIcon.src = "icon/close_linear_path.png";
        linearPathIcon.style.cursor = 'not-allowed'; 
        isLinearPathActive = false;
        linearPathButton.onclick = null;
    }
}

if(isLinearPathActive){
    song.addEventListener('ended', nextSong); 
}

function linearPath() {
    const linearPathIcon = document.querySelector('.extra_controls div:nth-child(2) img');

    if (isLinearPathActive) {
        song.removeEventListener('ended', nextSong); 
        linearPathIcon.src = "icon/close_linear_path.png"; 
        isLinearPathActive = false;
    } else {
        song.addEventListener('ended', nextSong); 
        linearPathIcon.src = "icon/linear_path.png"; 
        isLinearPathActive = true;
    }
}

function nextSong() {
    const nextButton = document.querySelector('.controls div:nth-child(3)'); 
    nextButton.click(); 
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

function openSongPage(page) {
    window.location.replace(page);
}
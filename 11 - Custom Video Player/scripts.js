//get DOM element
video = document.querySelector("video");
progressBar = document.querySelector(".progress");
toggle = document.querySelector("button.toggle");
volume = document.querySelector("input[name=volume]");
playBackRate = document.querySelector("input[name=playbackRate]");
skip10 = document.querySelector("button[data-skip='-10']");
skip25 = document.querySelector("button[data-skip='25']");


//function to handle 1 click play pause 
function handlePlaying(){
    let method = video.paused ? "play" : "pause";
    video[method]();
}

//function to handle 2 skip button (-10 and 25)
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}
//function to handle progress bar for every second;
function handleProgress(e){
    let percent = (video.currentTime/video.duration) *100;
    document.querySelector(".progress__filled").style.flexBasis = `${percent}%`;
}

//function to handle interact with progress bar
function updateTime(e){
    let percent = (e.offsetX / progressBar.offsetWidth) *100;
    video.currentTime = percent * video.duration/100;
}

//handle click and play pause button changing
video.addEventListener("click",handlePlaying)
video.addEventListener("play",()=>{toggle.textContent = "►";})
video.addEventListener("pause", () => {toggle.textContent = "❚ ❚";});
toggle.addEventListener("click", handlePlaying);

//handle progress bar every sec
video.addEventListener("timeupdate",handleProgress);

//handle volume and skip
volume.addEventListener("mousemove",() =>{
    video.volume = parseFloat(volume.value);
})
playBackRate.addEventListener("mousemove",()=>{
    video.playbackRate = parseFloat(playBackRate.value);
})
skip10.addEventListener("click",skip);
skip25.addEventListener("click",skip);


//hanlde interact with progress bar
let mousedown = false;
progressBar.addEventListener("click", updateTime);

progressBar.addEventListener("mousedown", () => mousedown = true);
progressBar.addEventListener("mouseup", () => mousedown = false);
progressBar.addEventListener("mousemove", (e) => mousedown && updateTime(e));


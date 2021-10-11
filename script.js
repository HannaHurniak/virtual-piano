const btnNote = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

const pianoKeys = document.querySelectorAll('.piano-key');
const pianoKeySharp = document.querySelectorAll('.sharp');

const btnFullScreen = document.querySelector('.fullscreen');

const piano = document.querySelector('.piano');



btnNote.addEventListener('click', () => {
  btnNote.classList.add('btn-active');
  btnLetters.classList.remove('btn-active');
  pianoKeys.forEach(elem => elem.classList.remove('piano-key-letter'));
});

btnLetters.addEventListener('click', () => {
  btnNote.classList.remove('btn-active');
  btnLetters.classList.add('btn-active');
  pianoKeys.forEach(elem => elem.classList.add('piano-key-letter'));
});


btnFullScreen.addEventListener('click', () => {
  fullScreen();
});

function fullScreen() {
    if (document.fullscreenElement){
      document.exitFullscreen()
    }else{
      document.documentElement.requestFullscreen().catch(console.log)
    }
  }


piano.addEventListener('mousedown', (event) => {
    if(event.target.classList.contains('piano-key')) {
        const note = event.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
    }
});

function playAudio(src) {
  const audio = new Audio();
audio.src = src;
audio.currentTime = 0;
audio.play();
}

const startSound = (event) => {
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
  event.target.classList.add('piano-key-active');
  event.target.classList.add('piano-key-active-pseudo');
}

const stopSound = (event) => {
  event.target.classList.remove('piano-key-active');
  event.target.classList.remove('piano-key-active-pseudo');
}

const startOver = (event) => {
  if(event.target.classList.contains('piano-key')) {
    event.target.classList.add('piano-key-active');
    event.target.classList.add('piano-key-active-pseudo');
  }
  pianoKeys.forEach((elem) => {
    elem.addEventListener('mouseover', startSound)
    elem.addEventListener('mouseout', stopSound)
  });
}

const stopOver = () => {
     pianoKeys.forEach((elem) => {
      elem.classList.remove('piano-key-active')
      elem.classList.remove('piano-key-active-pseudo')
      elem.removeEventListener('mouseover', startSound)
      elem.removeEventListener('mouseout', stopSound)
  });
}

piano.addEventListener('mousedown', startOver, false);
piano.addEventListener('mouseup', stopOver);


document.addEventListener('keydown',(event) => {
  const key = document.querySelector(`.piano [data-note="${event.key}"`);
  if (key !== null && !key.classList.contains('piano-key-active')){
    key.classList.add('piano-key-active');
    if (event.repeat === false){
      const note = event.key;
      const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }
  }
});

document.addEventListener('keyup',(event) => {
  const key = document.querySelector(`.piano [data-note="${event.key}"`);
  if (key !== null/* / && !key.classList.contains('piano-key-active') / */){
    key.classList.remove('piano-key-active');
  }
});
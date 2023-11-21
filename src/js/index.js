const audios = {
  earpick_L: [
    "./audio/earpick01_L.wav",
    "./audio/earpick02_L.wav",
    "./audio/earpick03_L.wav",
    "./audio/earpick04_L.wav",
    "./audio/earpick05_L.wav",
    "./audio/earpick06_L.wav",
    "./audio/earpick07_L.wav",
    "./audio/earpick08_L.wav",
    "./audio/earpick09_L.wav",
    "./audio/earpick10_L.wav",
  ],
  earpick_R: [
    "./audio/earpick01_R.wav",
    "./audio/earpick02_R.wav",
    "./audio/earpick03_R.wav",
    "./audio/earpick04_R.wav",
    "./audio/earpick05_R.wav",
    "./audio/earpick06_R.wav",
    "./audio/earpick07_R.wav",
    "./audio/earpick08_R.wav",
    "./audio/earpick09_R.wav",
    "./audio/earpick10_R.wav",
  ],
  sigh_L: ["./audio/sigh01_L.wav"],
  sigh_R: ["./audio/sigh01_R.wav"],
};

const audioCache = {};
Object.keys(audios).forEach((key) => {
  audioCache[key] = audios[key].map((filePath) => {
    const audio = new Audio(filePath);
    audio.load();
    return audio;
  });
});

const playAudio = (id, volume = 1.0) => {
  const audioList = audioCache[id];
  if (!audioList || audioList.length === 0) {
    console.error(`Invalid audio ID: ${id}`);
    return;
  }

  const num = Math.floor(Math.random() * audioList.length);
  const audio = audioList[num];
  audio.volume = volume;
  audio.play();
};

document.getElementById("earpick_L").addEventListener("click", () => {
  const volume = document.getElementById("volumeControl").value / 100;
  playAudio("earpick_L", volume);
});

document.getElementById("earpick_R").addEventListener("click", () => {
  const volume = document.getElementById("volumeControl").value / 100;
  playAudio("earpick_R", volume);
});

document.getElementById("sigh_L").addEventListener("click", () => {
  const volume = document.getElementById("volumeControl").value / 100;
  playAudio("sigh_L", volume);
});

document.getElementById("sigh_R").addEventListener("click", () => {
  const volume = document.getElementById("volumeControl").value / 100;
  playAudio("sigh_R", volume);
});

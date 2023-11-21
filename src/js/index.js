// JSON ファイルからオーディオデータを取得する関数
const fetchAudioData = async () => {
  try {
    const response = await fetch("./audioData.json");
    if (!response.ok) {
      throw new Error(
        `オーディオデータの取得に失敗しました: ${response.status}`
      );
    }
    const data = await response.json();
    return data.audios;
  } catch (error) {
    console.error("オーディオデータの取得エラー:", error.message);
    return null;
  }
};

// 取得したデータでオーディオキャッシュを初期化する関数
const initializeAudioCache = async () => {
  const audios = await fetchAudioData();
  if (audios) {
    const audioCache = {};
    Object.keys(audios).forEach((key) => {
      audioCache[key] = audios[key].map((filePath) => {
        const audio = new Audio(filePath);
        audio.load();
        return audio;
      });
    });
    return audioCache;
  }
  return null;
};

// 初期化されたオーディオキャッシュを使用してオーディオを再生する関数
const playAudio = (id, audioCache) => {
  const audioList = audioCache[id];
  if (!audioList || audioList.length === 0) {
    console.error(`無効なオーディオID: ${id}`);
    return;
  }

  const num = Math.floor(Math.random() * audioList.length);
  const audio = audioList[num];
  audio.play();
};

// オーディオキャッシュを初期化し、ボタンクリック時にオーディオを再生
initializeAudioCache().then((audioCache) => {
  if (audioCache) {
    document.getElementById("earpick_L").addEventListener("click", () => {
      playAudio("earpick_L", audioCache);
    });

    document.getElementById("earpick_R").addEventListener("click", () => {
      playAudio("earpick_R", audioCache);
    });

    document.getElementById("sigh_L").addEventListener("click", () => {
      playAudio("sigh_L", audioCache);
    });

    document.getElementById("sigh_R").addEventListener("click", () => {
      playAudio("sigh_R", audioCache);
    });
  }
});

// ダブルタップ時のズームを防止（iPhone用）
document.addEventListener(
  "dblclick",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

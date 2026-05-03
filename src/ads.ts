const PLAY_COUNT_KEY = "mushikui_play_count";

export async function showAdEveryFivePlays() {
  const playCount = Number(localStorage.getItem(PLAY_COUNT_KEY) || 0) + 1;
  localStorage.setItem(PLAY_COUNT_KEY, String(playCount));

  if (playCount % 5 !== 0) return;

  // 後でAdMobを入れたらここに広告表示を書く
  console.log("5回に1回広告を表示するタイミング");
}
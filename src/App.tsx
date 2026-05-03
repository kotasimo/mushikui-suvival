import "./App.css";
import { useSurvivalGame } from "./suvival";
import { TimerCircle } from "./components/TimerCircle";
import { useState, useEffect } from "react";
import { ResultScreen } from "./components/result";
import { GameScreen } from "./components/gamescreen";
import { MenuButton } from "./components/MenuButton";
import { AnswerLogTable } from "./components/AnswerLogTable";
import { showAdEveryFivePlays } from "./ads";

export default function App() {
  const survival = useSurvivalGame();
  const [flashMiss, setFlashMiss] = useState(false);

  function handleSurvivalNumber(n: number) {
    survival.answer(String(n));
  }

  useEffect(() => {
    if (survival.missCount === 0) return;

    setFlashMiss(true);
    const t = setTimeout(() => {
      setFlashMiss(false);
    }, 150); // 一瞬
    return () => clearTimeout(t);
  }, [survival.missCount]);

  if (survival.countdown !== null && survival.countdown > 0) {
    return (
      <main className="screen">
        <div className="countdown">{survival.countdown}</div>
      </main>
    );
  }

  if (survival.isPlaying) {
    return (
      <GameScreen
        question={survival.question?.text}
        input={survival.input}
        correct={survival.correctCount}
        miss={survival.missCount}
        onFinish={survival.endGame}
        onNumber={handleSurvivalNumber}
        onDelete={survival.deleteOne}
        onSubmit={survival.submit}
        togglePause={survival.togglePause}
        isPaused={survival.isPaused}
        flashMiss={flashMiss}
      >
        <TimerCircle
          timeLeftMs={survival.timeLeftMs}
          totalTimeMs={survival.answerTimeMs}
        />
      </GameScreen>
    );
  }

  if (survival.isFinished) {
    return (
      <ResultScreen
        onRetry={async () => {
          await showAdEveryFivePlays();
          survival.startGame();
        }}
        onHome={() => {
          survival.goHome();
        }}
      >
        <div className="result-score-main">{survival.correctCount}</div>

        <div className="result-best">Best {survival.bestScore}</div>

        <AnswerLogTable logs={survival.answerLogs} />
      </ResultScreen>
    );
  }

  return (
    <main className="screen">
      <h1>虫食い算 サバイバル</h1>

      <p className="description">考えるな、反射で解け。</p>

      <div className="menu-grid">
        <MenuButton
          label="5s"
          info={`Best: ${survival.getBestScore(5000)}`}
          onClick={() => {
            survival.setAnswerTimeMs(5000);
            survival.startGame();
          }}
        />

        <MenuButton
          label="3s"
          info={`Best: ${survival.getBestScore(3000)}`}
          onClick={() => {
            survival.setAnswerTimeMs(3000);
            survival.startGame();
          }}
        />

        <MenuButton
          label="2s"
          info={`Best: ${survival.getBestScore(2000)}`}
          onClick={() => {
            survival.setAnswerTimeMs(2000);
            survival.startGame();
          }}
        />
      </div>

      <ul className="description-list">
        <li>制限時間内に解き続ける</li>
        <li>3ミスで終了</li>
        <li>数字を入力 → Enterで次へ</li>
      </ul>
    </main>
  );
}

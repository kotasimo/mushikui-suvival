import { MobileKeypad } from "./MobileKeypad";
import { useEffect, useState } from "react";

type Props = {
  question: string | undefined;
  input: string;
  correct: number;
  miss: number;
  flashMiss?: boolean;

  onFinish: () => void;
  onNumber: (n: number) => void;
  onDelete: () => void;
  onSubmit: () => void;
  togglePause: () => void;
  isPaused: boolean;

  children?: React.ReactNode;
  countdown?: number | null;
};

export function GameScreen({
  question,
  input,
  correct,
  miss,
  flashMiss = false,
  onFinish,
  onNumber,
  onDelete,
  onSubmit,
  togglePause,
  isPaused,
  children,
  countdown,
}: Props) {
  const [usesTouchKeypad, setUsesTouchKeypad] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(max-width: 1180px) and (hover: none) and (pointer: coarse)"
    );

    const updateUsesTouchKeypad = () => {
      setUsesTouchKeypad(query.matches);
    };

    updateUsesTouchKeypad();
    query.addEventListener("change", updateUsesTouchKeypad);

    return () => {
      query.removeEventListener("change", updateUsesTouchKeypad);
    };
  }, []);

  return (
    <main className="game-screen">
      {countdown !== null && (
        <div className="countdown">
          {countdown === 0 ? "START" : countdown}
        </div>
      )}
      {/* finishボタン */}
      <button className="finish-button" onClick={onFinish}>
        finish
      </button>

      {/* pause表示 */}
      {isPaused && <div className="paused">STOP</div>}

      <div className="game-center">
        <div className="game-info">
          {children}
        </div>

        <div className="question-area">
          <div className="question">{question}</div>
          <div className="input">{input || ""}</div>
        </div>

        {/* score */}
        <div className="score-box">
          <div className="correct">{correct} ✓</div>
          <div className={`miss ${flashMiss ? "flash" : ""}`}>
            {miss} ✖
          </div>
        </div>
        
        {/* keypad */}
        {usesTouchKeypad && (
          <MobileKeypad
            onNumber={onNumber}
            onDelete={onDelete}
            onSubmit={onSubmit}
            togglePause={togglePause}
            isPaused={isPaused}
          />
        )}
      </div>
    </main>
  );
}

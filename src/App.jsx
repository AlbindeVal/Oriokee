import { useState } from "react";
import "./App.css";

//lägga till svårighet och kommentarer till steg
const patterns = [
  {
    name: "Crane",
    steps: [
      `${import.meta.env.BASE_URL}patterns/test1.png`,
      `${import.meta.env.BASE_URL}patterns/test2.png`,
      `${import.meta.env.BASE_URL}patterns/test3.png`,
    ],
  },
  {
    name: "Santa",
    steps: [
      `${import.meta.env.BASE_URL}patterns/test1.png`,
      `${import.meta.env.BASE_URL}patterns/test2.png`,
      `${import.meta.env.BASE_URL}patterns/test3.png`,
    ],
  },
  {
    name: "Baloon rabbit",
    steps: [
      `${import.meta.env.BASE_URL}patterns/test1.png`,
      `${import.meta.env.BASE_URL}patterns/test2.png`,
      `${import.meta.env.BASE_URL}patterns/test3.png`,
    ],
  },
];

function getPatternForDate(date) {
  const start = new Date("2026-01-01");

  const difference = date - start;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24)); //converting a time difference from milliseconds into whole days.

  return patterns[
    ((days % patterns.length) + patterns.length) % patterns.length
  ];
}

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [step, setStep] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(() => {
    const savedDate = localStorage.getItem("origamiCompletedDate");
    const today = new Date().toLocaleDateString("en-CA");

    return savedDate === today;
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("origamiStreak")) || 0;
  });

  const pattern = getPatternForDate(selectedDate);

  function changeDay(amount) {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + amount);

    setSelectedDate(newDate);
    setStep(0);
  }

  function changeStep(newStep) {
    setIsFading(true);

    setTimeout(() => {
      setStep(newStep);
      setIsFading(false);
    }, 400);
  }

  function finishPattern() {
    const today = new Date().toLocaleDateString("en-CA");

    const lastCompleted = localStorage.getItem("origamiCompletedDate");
    const savedStreak = Number(localStorage.getItem("origamiStreak")) || 0;

    let newStreak = 1;

    if (lastCompleted) {
      const lastDate = new Date(lastCompleted);
      const currentDate = new Date(today);

      const difference = (currentDate - lastDate) / (1000 * 60 * 60 * 24);

      if (difference === 1) {
        newStreak = savedStreak + 1;
      } else if (difference === 0) {
        newStreak = savedStreak;
      }
    }

    localStorage.setItem("origamiCompletedDate", today);
    localStorage.setItem("origamiStreak", newStreak);

    setStreak(newStreak);
    setIsCompleted(true);
  }

  return (
    <main>
      <h1>Origami of the Day (Version 0.1)</h1>

      <div className="day-controls">
        {/* <button onClick={() => changeDay(-1)}>← Previous Day</button> */}

        <p>{selectedDate.toLocaleDateString("en-GB")}</p>
        <p>🔥 {streak} day streak</p>

        {/* <button onClick={() => changeDay(1)}>Next Day →</button> */}
      </div>

      <p>Today's pattern:</p>

      <h2>{pattern.name}</h2>
      <p>
        Step {step + 1} / {pattern.steps.length}
      </p>

      <img
        className={isFading ? "fade" : ""}
        src={pattern.steps[step]}
        alt={`${pattern.name} step ${step + 1}`}
      />
      <p>/////TODO ADD STEP DESCRIPTIONS?/////</p>

      <div>
        <button
          onClick={() => changeStep(step - 1)}
          disabled={step === 0 || isFading}
        >
          ← Previous
        </button>

        <button
          onClick={() => changeStep(step + 1)}
          disabled={step === pattern.steps.length - 1 || isFading}
        >
          Next →
        </button>
      </div>
      {step === pattern.steps.length - 1 && (
        <div>
          {!isCompleted ? (
            <>
              <p> </p>
              <button className="finish-button" onClick={finishPattern}>
                Finished!
              </button>
            </>
          ) : (
            <p className="completed">✓ Today's origami completed!</p>
          )}
        </div>
      )}

      <section className="spotify-section">
        <p>Remember to take your time and relax, there is no time limit</p>

        <iframe
          src="https://open.spotify.com/embed/playlist/0O90pHZCmqqSJdEHlEW4KU?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Origami Focus Hour Spotify Playlist"
        ></iframe>
      </section>
    </main>
  );
}

export default App;

import { useState } from "react";
import "./App.css";

const patterns = [
  {
    name: "Crane",
    steps: [
      "public/patterns/test1.png",
      "public/patterns/test2.png",
      "publicgi/patterns/test3.png",
    ],
  },
  {
    name: "Santa",
    steps: [
      "/patterns/boat1.png",
      "/patterns/boat2.png",
      "/patterns/boat3.png",
    ],
  },
  {
    name: "Baloon rabbit",
    steps: [
      "/patterns/frog1.png",
      "/patterns/frog2.png",
      "/patterns/frog3.png",
    ],
  },
];

function getPatternForDate(date) {
  const start = new Date("2026-01-01");

  const difference = date - start;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  return patterns[
    ((days % patterns.length) + patterns.length) % patterns.length
  ];
}

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [step, setStep] = useState(0);
  const [isFading, setIsFading] = useState(false);

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

  return (
    <main>
      <h1>Origami of the Day (Version 0.1)</h1>

      <div className="day-controls">
        <button onClick={() => changeDay(-1)}>← Previous Day</button>

        <p>{selectedDate.toLocaleDateString("en-GB")}</p>

        <button onClick={() => changeDay(1)}>Next Day →</button>
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

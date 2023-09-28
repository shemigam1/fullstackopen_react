import { useState } from "react";

const Stats = ({ type, value }) => {
  return (
    <div>
      {type} {value}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  const all = bad + good + neutral;
  const average = (good + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h2>statistics</h2>

      <Stats type="good" value={good} />
      <Stats type="neutral" value={neutral} />
      <Stats type="bad" value={bad} />
      <Stats type="all" value={all} />
      <Stats type="average" value={average} />
      <Stats type="positive" value={positive} />
    </>
  );
};

export default App;

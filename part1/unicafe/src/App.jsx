import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ type, value }) => {
  return (
    <tr>
      <td>
        {type} {value}
      </td>
    </tr>
  );
};

const Statistics = ({ data }) => {
  return (
    <>
      <table>
        <tbody>
          <StatisticLine type="good" value={data.good} />
          <StatisticLine type="neutral" value={data.neutral} />
          <StatisticLine type="bad" value={data.bad} />
          <StatisticLine type="all" value={data.all} />
          <StatisticLine type="average" value={data.average} />
          <StatisticLine type="positive" value={`${data.positive} %`} />
        </tbody>
      </table>
    </>
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

  const data = {
    good,
    bad,
    neutral,
    all,
    average,
    positive,
  };

  const feedback = good || bad || neutral;
  const noFeedback = <p>No feeback given</p>;

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <h2>statistics</h2>
      {feedback ? <Statistics data={data} /> : noFeedback}
    </>
  );
};

export default App;

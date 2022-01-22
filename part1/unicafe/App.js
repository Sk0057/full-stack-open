import React, { useState } from "react";

//button component
const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

//individual statistic line component, ig table row now
const StatLine = ({ text, count }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{count}</td>
      </tr>
    </>
  );
};

//all the statistics displayed
const Statistics = ({ reviews }) => {
  const all = reviews.good + reviews.neutral + reviews.bad;

  const avg = () => {
    return (reviews.good - reviews.bad) / all;
  };

  const positive = () => {
    return (reviews.good / all) * 100 + "%";
  };

  if (all === 0) return "no feedback given";

  return (
    <>
      <table>
        <StatLine text="good" count={reviews.good} />
        <StatLine text="neutral" count={reviews.neutral} />
        <StatLine text="bad" count={reviews.bad} />
        <StatLine text="all" count={all} />
        <StatLine text="avg" count={avg()} />
        <StatLine text="positive" count={positive()} />
      </table>
    </>
  );
};

//the main app component
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countGood = () => setGood(good + 1);
  const countNeutral = () => setNeutral(neutral + 1);
  const countBad = () => setBad(bad + 1);

  const reviews = {
    good: good,
    neutral: neutral,
    bad: bad,
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={countGood} />
      <Button text="neutral" onClick={countNeutral} />
      <Button text="bad" onClick={countBad} />
      <h2>statistics</h2>
      <Statistics reviews={reviews} />
    </div>
  );
};

export default App;

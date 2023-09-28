import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Anecdotes = ({ anecdote, vote }) => {
  return (
    <div className="">
      {anecdote} and has {vote} votes
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));

  const handleNext = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const newVote = [...vote];
    newVote[selected] += 1;
    // console.log(vote);
    // console.log(Math.max(...vote));
    // console.log(maxvotesIndex);
    // console.log(selected);
    setVote(newVote);
  };

  const maxvotes = Math.max(...vote);
  const maxvotesIndex = vote.indexOf(maxvotes);
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        <Anecdotes anecdote={anecdotes[selected]} vote={vote[selected]} />
      </div>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNext} text="next" />
      {maxvotes === 0 ? (
        ""
      ) : (
        <div className="">
          <h1>Anecdote with the most votes</h1>
          <div>
            {anecdotes[maxvotesIndex]} and has {maxvotes} votes
          </div>
        </div>
      )}
    </>
  );
};

export default App;

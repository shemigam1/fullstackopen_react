import Part from "./Part";
import Total from "./Total";

export default function Content({ parts }) {
  // const parts = [
  //   {
  //     name: "Fundamentals of React",
  //     exercises: 10,
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exercises: 7,
  //   },
  //   {
  //     name: "State of a component",
  //     exercises: 14,
  //   },
  // ];

  // console.log(parts);
  const sum = parts.reduce((acc, cur) => {
    // console.log(1, acc, cur);
    return acc + cur.exercises;
  }, 0);
  return (
    <div>
      {parts.map((part) => {
        // sum += part.exercises;
        return (
          <Part key={part.id} partName={part.name} exercise={part.exercises} />
        );
      })}
      <Total sum={sum} />
    </div>
  );
}

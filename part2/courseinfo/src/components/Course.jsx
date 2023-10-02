import Content from "./Content";
import Header from "./Header";

export default function Course({ courses }) {
  return (
    <>
      {courses.map((course) => {
        return (
          <>
            <Header key={course.id} name={course.name} />
            <Content parts={course.parts} />
          </>
        );
      })}
    </>
  );
}

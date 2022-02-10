import React from "react";

//renders the heading of an individual course
const Header = ({ course }) => <h1>{course.name}</h1>;

//renders a single part
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

//renders the content of a course
const Content = ({ course }) => (
  <>
    {course.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

//renders the total no of exercises
const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return <p>Number of exercises {total}</p>;
};

//renders a whole course
const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;

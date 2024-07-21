const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Content = ({ course }) => {
  console.log(course);
  return (
    <div>
      {course.parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
};

const Total = ({ course }) => {
  return (
    <div>
      <strong>
        Number of exercises{" "}
        {course.parts.reduce((acc, part) => {
          return acc + part.exercises;
        }, 0)}
      </strong>
    </div>
  );
};

export default Course;

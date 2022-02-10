import Person from "./Person";

const Numbers = ({ persons, handleDelete }) => {
  return (
    <>
      <ul>
        {persons.map((person) => (
          <Person
            key={person.name}
            name={person.name}
            number={person.number}
            onClick={() => handleDelete(person.id, person.name)}
          />
        ))}
      </ul>
    </>
  );
};

export default Numbers;

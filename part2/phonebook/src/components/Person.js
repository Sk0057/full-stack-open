const Person = ({ name, number, onClick }) => {
  return (
    <>
      <li className="number">
        {name} {number} <button onClick={onClick}>delete</button>
      </li>
    </>
  );
};

export default Person;

import DisplayDetails from "./DisplayDetails";
import Weather from "./Weather";

const Display = ({ countries, handleClick, weather }) => {
  if (countries.length === 0) {
    return <>No result, specify another filter</>;
  } else if (countries.length > 10) {
    return <>Result too broad, specify another filter</>;
  } else if (countries.length <= 10 && countries.length >= 2) {
    return (
      <div>
        {countries.map((x) => (
          <div key={x.name.common}>
            {x.name.common}
            <button onClick={() => handleClick(x.name.common)}>show</button>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <>
        <DisplayDetails country={countries[0]} />
        <Weather country={countries[0]} />
      </>
    );
  }
};

export default Display;

const DisplayDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>
        <b>Region:</b> {country.region}
        <br />
        <b>Sub-Region:</b> {country.subregion}
        <br />
        <b>Polulation:</b>{" "}
        {new Intl.NumberFormat("en-US").format(country.population)}
        <br />
        <b>Capital:</b> {country.capital[0]}
        <br />
        <b>Currency:</b> {Object.values(country.currencies)[0].name}
        <br />
        <b>Symbol:</b> {Object.values(country.currencies)[0].symbol}
      </p>
      <h3>Languages Spoken</h3>
      {Object.values(country.languages).map((x) => (
        <li key={x}>{x}</li>
      ))}
      <br />
      <img src={country.flags.png} alt="flag" />
    </>
  );
};

export default DisplayDetails;

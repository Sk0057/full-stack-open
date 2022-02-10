import React, { useEffect, useState } from "react";
import Numbers from "./components/Numbers";
import Form from "./components/Form";
import services from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [notificationName, setNotificationName] = useState("");

  //code to get initial data from db.json
  const hook = () => services.getAll().then((data) => setPersons(data));
  useEffect(hook, []);

  //code to add a new number in the db
  const addNumber = (event) => {
    event.preventDefault();

    let newID = 1;
    if (persons.at(-1)) newID = persons.at(-1).id + 1;

    const newPerson = {
      name: newName,
      number: newNumber,
      id: newID,
    };

    const found = persons.some(
      (x) => x.name.toLowerCase() === newName.toLowerCase()
    );
    const found2 = persons.some((x) => x.number === newNumber);

    if (newName === "" || newNumber === "")
      window.alert("fill both the name and number");
    else if (found) updatePerson();
    else if (found2) window.alert(`${newNumber} already exists`);
    else {
      services.addPerson(newPerson);
      setPersons(persons.concat(newPerson));
      setMessage("Added");
      setNotificationName(newPerson.name);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

    setNewName("");
    setNewNumber("");
  };

  //code to update the number
  const updatePerson = () => {
    if (
      window.confirm(
        `${newName} already exists in the database, do you want to update the number?`
      )
    ) {
      const obj = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );
      const updatedObj = { ...obj, number: newNumber };
      services
        .updatePerson(updatedObj.id, updatedObj)
        .then((returnedObj) => {
          setPersons(persons.map((p) => (p.id !== obj.id ? p : returnedObj)));
          setMessage("Updated");
          setNotificationName(returnedObj.name);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setMessage("error");
          setNotificationName(updatedObj.name);
          setTimeout(() => {
            setMessage(null);
          }, 3000);

          setPersons(persons.filter((p) => p.id !== updatedObj.id));
        });
    }
  };

  //code to delete a person
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      services
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage("Deleted");
          setNotificationName(name);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setMessage("error");
          setNotificationName(name);
          setTimeout(() => {
            setMessage(null);
          }, 3000);

          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  //code to filter names accoring to our filter textbox searches
  const filterPeople = (event) => {
    event.preventDefault();
    setShowAll(!showAll);
  };

  const peopleToShow = showAll
    ? persons
    : persons.filter(
        (person) => person.name.toLowerCase().indexOf(filter) > -1
      );

  //function expressions to handle typing in the textboxes
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  //arrays for passing things to generate forms
  const personInputs = [
    { text: "name", state: newName, eventHandler: handleNameChange },
    {
      text: "number",
      state: newNumber,
      eventHandler: handleNumberChange,
    },
  ];

  const searchInputs = [
    {
      text: "filter",
      state: filter,
      eventHandler: handleFilterChange,
    },
  ];

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} name={notificationName} />
      <Form
        onSubmit={filterPeople}
        inputs={searchInputs}
        buttonType="submit"
        buttonText={showAll ? "filter" : "show all"}
      />
      <h2>Add a new person</h2>
      <Form
        onSubmit={addNumber}
        inputs={personInputs}
        buttonType="submit"
        buttonText="save"
      />
      <h2>Numbers</h2>
      <Numbers persons={peopleToShow} handleDelete={deletePerson} />
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  // Persons with dummy data
  const [persons, setPersons] = useState([]);

  // States
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const personsToShow =
    filter.length > 0
      ? persons.filter((person) => person.name.toLowerCase().includes(filter))
      : persons;

  // Handlers
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const addPerson = (e) => {
    e.preventDefault();
    const isExists = persons.find(
      (person) => person.name.toLocaleLowerCase() === newName.toLowerCase()
    );
    if (isExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  };

  const filterHandler = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterHandler={filterHandler} />

      <h3>Add a new</h3>

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        name={newName}
        number={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/PersonService";

const App = () => {
  // Persons with dummy data
  const [persons, setPersons] = useState([]);

  // States
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
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
    const existsPerson = persons.find(
      (person) => person.name.toLocaleLowerCase() === newName.toLowerCase()
    );
    if (existsPerson) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (!window.confirm(message)) return;
      personService
        .update(existsPerson.id, {
          ...existsPerson,
          number: newNumber,
        })
        .then((returnedPerson) =>
          setPersons(
            persons.map((person) =>
              returnedPerson.id === person.id ? returnedPerson : person
            )
          )
        )
        .catch((err) => alert("Error: Peson hasn't been updated"));
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((newPerson) => setPersons([...persons, newPerson]))
        .catch((err) => alert("Error: person hasn't been added"));
    }
    setNewName("");
    setNewNumber("");
  };

  const filterHandler = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const deleteHandler = (personToDelete) => {
    if (!window.confirm(`Delete ${personToDelete.name}?`)) return;
    personService
      .deletePerson(personToDelete.id)
      .then(() =>
        setPersons(
          persons.filter(
            (filterPerson) => personToDelete.id !== filterPerson.id
          )
        )
      )
      .catch((err) => alert("Error: Persons hasn't beend deleted."));
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

      <Persons persons={personsToShow} deleteHandler={deleteHandler} />
    </div>
  );
};

export default App;

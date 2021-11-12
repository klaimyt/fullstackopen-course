import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/PersonService";
import Notification from "./components/Notification";

const App = () => {
  // Persons with dummy data
  const [persons, setPersons] = useState([]);

  // States
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotigication] = useState({
    message: null,
    isError: null,
  });

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
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              returnedPerson.id === person.id ? returnedPerson : person
            )
          );
          showNotification(`${existsPerson.name} updated`, false);
        })
        .catch((err) => {
          showNotification(
            `Error: ${existsPerson.name} has been removed from server`,
            true
          );
          setPersons(persons.filter((person) => person.id !== existsPerson.id));
        });
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((newPerson) => {
          setPersons([...persons, newPerson]);
          showNotification(`Added ${newPerson.name}`, false);
        })
        .catch((err) =>
          showNotification(`Error: ${newPerson.name} hasn't been added`, true)
        );
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
      .then(() => {
        setPersons(
          persons.filter(
            (filterPerson) => personToDelete.id !== filterPerson.id
          )
        );
        showNotification(`Deleted ${personToDelete.name}`, false);
      })
      .catch((err) =>
        showNotification(
          `Error: ${personToDelete.name} hasn't beend deleted.`,
          true
        )
      );
  };

  // Helper
  const showNotification = (message, isError) => {
    setNotigication({ message, isError });
    setTimeout(() => setNotigication(null), 4000);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

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

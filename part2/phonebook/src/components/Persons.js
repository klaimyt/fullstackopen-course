const Persons = ({ persons, deleteHandler }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number} <button onClick={() => deleteHandler(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;

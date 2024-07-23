import { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ newFilter, setNewFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)} />
    </div>
  );
};

const Form = ({ props }) => {
  const [persons, setPersons, newName, setNewName, newNumber, setNewNumber] = [
    ...props,
  ];

  const addPerson = (e) => {
    e.preventDefault();

    if (!newName) return;
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, newFilter }) => {
  const visiblePersons =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  return (
    <div>
      {visiblePersons.map((person) => {
        return (
          <div key={person.name}>
            <div>{person.name}</div>
            <div>{person.number}</div>
          </div>
        );
      })}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:3001/persons")
  //     .then((response) => response.json())
  //     .then((data) => setPersons(data));
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new</h2>
      <Form
        props={[
          persons,
          setPersons,
          newName,
          setNewName,
          newNumber,
          setNewNumber,
        ]}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;

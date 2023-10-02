import { useState } from "react";
import Form from "./components/Form";
import Name from "./components/Name";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState(false);
  const [newSearchValue, setNewSearchValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let duplicateNames = checkName(persons);
    if (duplicateNames === false) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: newName,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} already exists`);
      console.log(persons);
    }
    // console.log(event.target);
  };

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const checkName = (persons) => {
    let exists = persons.filter(
      (person) =>
        person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    );
    console.log(exists);
    if (exists.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  let personsToShow = !newSearch
    ? persons
    : persons.filter((person) => {
        return person.name.toLowerCase().includes(newSearchValue.toLowerCase());
      });

  const handleSearch = (e) => {
    setNewSearchValue(e.target.value);
    setNewSearch(true);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div className="">
        Search:{" "}
        <input type="text" value={newSearchValue} onChange={handleSearch} />
      </div>
      <Form
        handleSubmit={handleSubmit}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <div className="">
        {personsToShow.map((person) => {
          return (
            <Name name={person.name} number={person.number} key={person.id} />
          );
        })}
      </div>
    </div>
  );
};

export default App;

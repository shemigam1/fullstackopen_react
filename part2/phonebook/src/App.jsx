import { useState, useEffect } from "react";
import Form from "./components/Form";
import Name from "./components/Name";
import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newSearch, setNewSearch] = useState(false);
	const [newSearchValue, setNewSearchValue] = useState("");

	useEffect(() => {
		const onLoad = (data) => {
			setPersons(data);
		};

		const promise = axios.get(" http://localhost:3001/persons");
		promise.then((response) => onLoad(response.data));
	}, []);

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

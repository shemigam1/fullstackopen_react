import { useState, useEffect } from "react";
import Form from "./components/Form";
import Name from "./components/Name";
import { create, deletePerson, getAll } from "./services/personService";

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

		getAll().then((data) => onLoad(data));
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
			create(newPerson).then((data) => setPersons(persons.concat(data)));

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

	const handleDelete = (e) => {
		const target = e.target.name;
		let modPersons = [];
		let modPersonsBefore = [];
		let modPersonsAfter = [];
		for (let i = 0; i < persons.length; i++) {
			if (persons[i].name === target) {
				modPersonsBefore = persons.slice(0, i);
				modPersonsAfter = persons.slice(i + 1);
			}
		}
		// console.log(persons[0].name);
		modPersons = modPersonsBefore.concat(modPersonsAfter);

		deletePerson(target).then(() => setPersons(modPersons));
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
						<Name
							name={person.name}
							number={person.number}
							key={person.id}
							handleDelete={handleDelete}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default App;

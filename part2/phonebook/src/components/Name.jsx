export default function Name({ name, number, handleDelete }) {
	return (
		<>
			<p>
				{name}: {number}
			</p>
			<button name={name} onClick={handleDelete}>
				delete
			</button>
		</>
	);
}

import Todo from './Todo'

const TodoList = ({ todos, setDone, deleteTodo, toggleForm }) => {
	const doneFunction = id => setDone(id)
	const deleteFunction = id => deleteTodo(id)
	return (
		<>
			<span>
				<h1>My Todo List:</h1>
				<button className="btn btn-success" onClick={toggleForm}>
					Add todo
				</button>
			</span>
			<br />
			{
				todos.length > 0 
					? todos.map(todo => (
							<Todo
								key={todo.id}
								todo={todo}
								doneFunction={doneFunction}
								deleteFunction={deleteFunction}
							/>
						))
					: <p style={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '1rem' }}>Empty list!</p>
			}
		</>
	)
}

export default TodoList

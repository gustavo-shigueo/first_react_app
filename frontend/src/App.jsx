import { useEffect, useState } from 'react'
import { Header, Searchbar, TodoList, Form } from './components'

function App() {
	const URL = 'http://localhost:3001/todo'
	const HEADERS = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}

	const debugging = false
	const [todos, setTodos] = useState([])

	const [showForm, setShowForm] = useState(false)

	const [showTodos, setShowTodos] = useState(todos)

	const [search, setSearch] = useState('')

	const filter = ({ target: { value } }) => setSearch(value)

	const setDone = async id => {
		try {
			await fetch(`${URL}/${id}`, { headers: HEADERS, method: 'PATCH' })
			setTodos(
				todos.map(todo => (todo.id !== id ? todo : { ...todo, done: !todo.done }))
			)
		} catch (e) {
			return console.log(e)
		}
	}

	const addTodo = async todo => {
		try {
			const body = JSON.stringify({ ...todo })
			await fetch(URL, { body, method: 'POST', headers: HEADERS })
			setTodos([...todos, todo])
		} catch (e) {
			return console.log(e)
		}
	}

	const deleteTodo = async id => {
		try {
			await fetch(`${URL}/${id}`, { headers: HEADERS, method: 'DELETE' })
			setTodos(todos.filter(todo => todo.id !== id))
		} catch (e) {
			return console.log(e)
		}
	}

	const toggleForm = () => setShowForm(!showForm)

	const getTodos = async () => {
		try {
			const response = await fetch(URL)
			const todos = await response.json()
			return todos.map(({ _id, title, description, done }) => ({ id: _id, title, description, done }))
		} catch (e) {
			return console.log(e)
		}
	}

	useEffect(() => {
		getTodos().then(setTodos)
	}, [])

	useEffect(() => {
		if (!search) return setShowTodos(todos)
		return setShowTodos(
			todos.filter(
				({ title, description }) =>
					title.toLowerCase().includes(search.toLowerCase()) ||
					description.toLowerCase().includes(search.toLowerCase())
			)
		)
	}, [search, todos])

	return (
		<>
			<Header />
			<main className="container">
				<Searchbar filter={filter} search={search} />
				<div className="main-section">
					<div className="scrollable">
						{
							showForm 
								? <Form toggleForm={toggleForm} addTodo={addTodo} />
								: <TodoList
								todos={showTodos}
								setDone={setDone}
										deleteTodo={deleteTodo}
										toggleForm={toggleForm}
									/>
						}
					</div>
				</div>
				{debugging && (
					<textarea
						cols="20"
						rows="40"
						style={{ fontSize: '1em', fontWeight: 'bold' }}
						value={JSON.stringify(showTodos, null, 4)}
						onChange={() => null}
					/>
				)}
			</main>
		</>
	)
}

export default App

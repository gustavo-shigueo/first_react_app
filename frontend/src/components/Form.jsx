import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Input from './Input'
import { v4 as uuid } from 'uuid'

const Form = ({ toggleForm, addTodo }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const getTitle = t => setTitle(t)
  const getDescription = t => setDescription(t)

  const saveTodo = () => {
    addTodo({ id: uuid(), title, description })
    toggleForm()
  }

	return (
		<>
			<span>
				<h1>Add Todo:</h1>
				<button className="btn btn-danger" onClick={toggleForm}>
					Cancel
				</button>
			</span>
			<Input label="Title" getValue={getTitle} />
			<Input label="Description" getValue={getDescription} />
			<button className="btn btn-info" onClick={saveTodo}>
				<FontAwesomeIcon icon={faSave} />&nbsp;
				Save todo
			</button>
		</>
	)
}

export default Form

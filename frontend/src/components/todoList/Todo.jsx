import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import '../css/todo/index.css'

const Todo = ({
	todo: { id, title, description, done },
	doneFunction,
	deleteFunction,
}) => {
	return (
		<div className="todo">
			<div className="text">
				<h2 style={{ textDecoration: done ? 'line-through' : 'none' }}>
					{title}
				</h2>
				<p>{description}</p>
			</div>
			<div className="buttons">
				<button type="button" onClick={() => deleteFunction(id)}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
				<input
					type="checkbox"
					id="checkDone"
					checked={done}
					onChange={() => null}
				/>
				<label
					onClick={() => doneFunction(id)}
					htmlFor="checkDone"
					style={{ background: `var(--${done ? 'success' : 'danger'})` }}
				/>
			</div>
		</div>
	)
}

export default Todo

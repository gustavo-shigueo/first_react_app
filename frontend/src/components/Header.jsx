import { useState } from 'react'
import './css/header/index.css'

const Header = () => {
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const [time, setTime] = useState(new Date().toLocaleString())
  setInterval(() => setTime(new Date().toLocaleString()), 1000)

  return (
		<header className="header">
			<h1>Todo List</h1>
			<span>{`${week[new Date().getDay()]}, ${time}`}</span>
		</header>
	)
}

export default Header

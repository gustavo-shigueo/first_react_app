import { useEffect, useState } from 'react'
import './css/input/index.css'

const Input = ({ label, getValue }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (getValue) getValue(value)
  }, [getValue, value])

  return (
    <div className="input-group">
      <input type="text" id={label} value={value} onChange={e => setValue(e.target.value)} className={value ? 'has-text' : '' } />
      <label className="label-group" htmlFor={label}>
        <span className="label-text">{label}</span>
      </label>
    </div>
  )
}

export default Input

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './css/searchbar/index.css'

const Searchbar = ({ filter, search }) => {
	return (
		<div className="searchbox">
			<label htmlFor="search">
        <input
          type="text"
          id="search"
          value={search}
          onChange={e => filter(e)}
          required
          autoComplete="off"
        />
        <span className="label-name">Search</span>
        <FontAwesomeIcon icon={faSearch} />
        </label>
		</div>
	)
}

export default Searchbar

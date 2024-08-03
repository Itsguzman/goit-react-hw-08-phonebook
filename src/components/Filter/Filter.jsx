import PropTypes from 'prop-types';
import css from './filter.module.css';

export const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <p>Find contacts by name</p>
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        placeholder="Search..."
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

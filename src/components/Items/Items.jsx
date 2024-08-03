import PropTypes from 'prop-types';

export const Items = ({ filteredContact, deleteContact }) => {
  const handleDelete = () => {
    deleteContact(filteredContact.id);
  };

  return (
    <tr>
      <td>{filteredContact.name}</td>
      <td>{filteredContact.phone || 'No phone number provided'}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

Items.propTypes = {
  filteredContact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Items;

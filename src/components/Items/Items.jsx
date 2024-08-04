import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export const ContactListItem = ({ filteredContact, deleteContact }) => {
  const handleDelete = () => {
    deleteContact(filteredContact.id);
    console.log(
      `${filteredContact.name} was successfully deleted from your contacts!`
    );
  };

  return (
    <tr>
      <td>{filteredContact.name}</td>
      <td>{filteredContact.number}</td>
      <td>
        <IconButton
          aria-label="Delete contact"
          icon={<DeleteIcon />}
          colorScheme="red"
          size="sm"
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
};

ContactListItem.propTypes = {
  filteredContact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

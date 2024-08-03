import React from 'react';
import PropTypes from 'prop-types';
import Items from '../Items/Items';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(contact => (
          <Items
            key={contact.id}
            filteredContact={contact}
            deleteContact={deleteContact}
          />
        ))}
      </tbody>
    </table>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;

import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

export const ContactForm = ({ addContact, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => setName(e.target.value);
  const handleNumberChange = e => setNumber(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      console.log(`${name} is already in your contacts`); // Fixed
      return;
    } else {
      console.log(`${name} is successfully added to your contacts!`); // Fixed
    }

    addContact({
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    });

    setName('');
    setNumber('');
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="lg"
      mx="auto"
      mt={5}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
    >
      <FormControl id="name" mb={4} isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={name}
          onChange={handleNameChange}
        />
      </FormControl>

      <FormControl id="number" mb={4} isRequired>
        <FormLabel>Number</FormLabel>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          value={number}
          onChange={handleNumberChange}
        />
      </FormControl>

      <Button type="submit" colorScheme="teal" width="full">
        Add Contact
      </Button>
    </Box>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/authentication/authenticationOperation'; // Your Redux thunk for login
import { NavLink } from 'react-router-dom';
import {
  Heading,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector(state => state.auth);

  const handleSubmit = e => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    dispatch(logIn({ email, password }));
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="sm"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading>Login</Heading>
      <FormControl id="email" isInvalid={error && !email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          focusBorderColor="teal.500"
        />
      </FormControl>

      <FormControl id="password" isInvalid={error && !password} mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          focusBorderColor="teal.500"
        />
      </FormControl>

      <Button type="submit" colorScheme="teal" width="full" mt={4}>
        Login
      </Button>
      <Button
        as={NavLink}
        to="/register"
        colorScheme="green"
        width="full"
        mt={4}
      >
        Create Account
      </Button>

      {error && (
        <FormErrorMessage mt={2} color="red.500">
          {error}
        </FormErrorMessage>
      )}
    </Box>
  );
};

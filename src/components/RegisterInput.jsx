/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <Input
          id="name"
          placeholder="Enter your full name"
          type="text"
          value={name}
          onChange={onNameChange}
          className="h-11"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          placeholder="Input your email"
          type="email"
          value={email}
          onChange={onEmailChange}
          className="h-11"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          type="password"
          placeholder="Create a strong password"
          value={password}
          onChange={onPasswordChange}
          className="h-11"
          required
        />
        <FieldDescription>
          Minimal 6 karakter unik.
        </FieldDescription>
      </Field>

      <Button className="w-full h-11 mt-4 text-base font-medium" type="submit">
        Create Account
      </Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
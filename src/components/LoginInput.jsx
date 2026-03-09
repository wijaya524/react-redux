/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={onEmailChange}
            className="h-11"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={onPasswordChange}
            className="h-11"
          />
          <FieldDescription>
            Minimal 6 karakter.
          </FieldDescription>
        </Field>
      </div>

      <Button className="w-full h-11 text-base font-medium" type="submit">
        Sign In
      </Button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
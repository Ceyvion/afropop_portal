import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xxxl};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 40rem;
  text-align: center;
`;

const Form = styled.form`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: left;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 1.6rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: border-color ${({ theme }) => theme.transitions.quick};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic would go here
    console.log('Logging in with', email, password);
    navigate('/');
  };

  return (
    <PageWrapper>
      <LoginCard>
        <h1>Member Login</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" variant="primary" size="large" style={{ width: '100%' }}>
            Login
          </Button>
        </Form>
      </LoginCard>
    </PageWrapper>
  );
}

export default Login;

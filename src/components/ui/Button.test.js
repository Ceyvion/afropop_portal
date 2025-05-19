import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme as theme } from '../../styles/theme';
import Button from './Button';

test('renders children and handles click', () => {
  const onClick = jest.fn();
  render(
    <ThemeProvider theme={theme}>
      <Button onClick={onClick}>Click me</Button>
    </ThemeProvider>
  );
  const button = screen.getByRole('button', { name: /click me/i });
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});

// Write your tests here
import React from 'react';
import { render, screen } from '@testing-library/react';

import AppClass from './AppClass';

test("Render without errors", ()=> {
  render(<AppClass/>)
})

test("When app mounts, Coordinates display on the screen", ()=> {
  render(<AppClass/>);
  const cord = screen.getByText(/coordinates/i);
  expect(cord).toBeTruthy();
})

test("When app mounts, email form displays on the screen", ()=> {
  render(<AppClass/>);
  const email = screen.getAllByPlaceholderText(/type email/i);
  expect(email).toBeTruthy();
})

test("up button appears on the screen", ()=>{
  render(<AppClass/>);
  const upButton = screen.getByText("UP");
  expect(upButton).toBeTruthy();
})

test("Reset button appears on the screen", ()=> {
  render(<AppClass/>);
  const resetButton = screen.getByText("reset");
  expect(resetButton).toBeTruthy();
})
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";
import { act } from "react-dom/test-utils";

test("check that all form elements are in document", () => {
  const wrapper = render(<App />);

  const firstName = wrapper.queryByText(/first name/i);
  const lastName = wrapper.queryByText(/last name/i);
  const email = wrapper.queryByText(/email/i);
  const message = wrapper.queryByText(/message/i);

  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(message).toBeInTheDocument();
});

test("check that elements start with empty input", () => {
  const wrapper = render(<App />);

  expect(wrapper.getByTestId('required-fName')).not.toHaveValue();
  expect(wrapper.getByTestId('required-lName')).not.toHaveValue();
  expect(wrapper.getByTestId('required-email')).not.toHaveValue();
  expect(wrapper.getByTestId('text-area')).not.toHaveValue();
});

test("check that elements have a specific class", () => {
  const wrapper = render(<App />);

  expect(wrapper.getByTestId('app-div')).toHaveClass("App");
});

test("fire event: check that elements can hold value when typed in", () => {
  const wrapper = render(<App />);

  act(() => {
    fireEvent.change(wrapper.getByTestId('required-fName'), { target: { value: 'Name' } });
    fireEvent.change(wrapper.getByTestId('required-lName'), { target: { value: 'Last' } });
    fireEvent.change(wrapper.getByTestId('required-email'), { target: { value: 'email@mail.com' } });
    fireEvent.change(wrapper.getByTestId('text-area'), { target: { value: 'A written message in the text area.' } });
  });

  expect(wrapper.getByTestId('required-fName').value).toBe('Name');
  expect(wrapper.getByTestId('required-lName').value).toBe('Last');
  expect(wrapper.getByTestId('required-email').value).toBe('email@mail.com');
  expect(wrapper.getByTestId('text-area').value).toBe('A written message in the text area.');
});
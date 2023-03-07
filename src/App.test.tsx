import React from 'react';
import { render, screen } from '@testing-library/react';
import user from "@testing-library/user-event";
import NewNote from "./components/NewNote";
import { NoteData, Tag } from "./App";
import { BrowserRouter } from "react-router-dom";

test('rendering of NewNote component', () => {

  window.history.pushState({}, "", "/new");

  render(
    <BrowserRouter>
        <NewNote
          onSubmit={function (data: NoteData): void {}}
          onAddTag={function (data: Tag): void {}}
          tags={[]}
        />
    </BrowserRouter>
  );
  
  // assure that the input for title is present
  const titleInput = screen.getByRole('textbox', {
    name: 'Title'
  });
  expect(titleInput).toBeInTheDocument();

  const selectelement = screen.getByRole('combobox', {
    description: 'Select...'
  });
  expect(selectelement).toBeInTheDocument();

  // assure that the textarea for Body/content is present
  const textareaInput = screen.getByRole('textbox', {
    name: "Body"
  });
  expect(textareaInput).toBeInTheDocument();
});

test('entering data', () => {

  const mockfun = jest.fn();

  window.history.pushState({}, "", "/new");

  render(
    <BrowserRouter>
        <NewNote
          onSubmit={mockfun}
          onAddTag={function (data: Tag): void {}}
          tags={[]}
        />
    </BrowserRouter>
  );

  const titleInput = screen.getByRole('textbox', {
    name: 'Title'
  });
  user.click(titleInput);
  user.keyboard('i m test');

  const selectelement = screen.getByRole('combobox', {
    description: 'Select...'
  });
  user.click(selectelement);
  user.keyboard('a');
  user.keyboard('{Enter}');

  const textareaInput = screen.getByRole('textbox', {
    name: "Body"
  })
  user.click(textareaInput);
  user.keyboard('i am test');

  const saveButton = screen.getByRole('button', {
    name: 'Save'
  });
  user.click(saveButton);
  expect(mockfun).toHaveBeenCalled();
  // console.log(selectelement);
  // expect(mockfun).toHaveBeenCalledWith({ title: 'i m test', markdown: 'i am test', tags: [{id: 'f9287059-55ad-4746-a06c-ad7467f57b22', label:'a'}]});
})
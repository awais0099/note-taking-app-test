import React from 'react';
import { render, screen } from '@testing-library/react';
import user from "@testing-library/user-event";
import NewNote from "./components/NewNote";
import { NoteData, Tag } from "./App";
import { BrowserRouter } from "react-router-dom";
import { v4 as uuidV4 } from 'uuid';
import NoteCard from './components/NoteCard';
import App from './App';

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

test('entering data', async () => {
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
  });

  user.click(textareaInput);
  user.keyboard('i am test');

  const saveButton = screen.getByRole('button', {
    name: 'Save'
  });

  user.click(saveButton);
  expect(mockfun).toHaveBeenCalled();
});

test('rendering list', async () => {
  const note = {id: '1', title: 'title', tags: [{id: '13', label: 'a'}, {id: '23', label: 'b'}]};

  window.history.pushState({}, "", "/");

  const {container } = render(
    <BrowserRouter>
        <NoteCard id={note.id} title={note.title} tags={note.tags} />
    </BrowserRouter>
  );
  const card = container.querySelector('.card-body');
  expect(card).toBeInTheDocument();
  screen.debug();
});

test('search note', async () => {
  const note = {id: '1', title: 'title', tags: [{id: '13', label: 'a'}, {id: '23', label: 'b'}]};

  window.history.pushState({}, "", "/");

  const {container } = render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
  );

  screen.debug();
});
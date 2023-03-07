import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NewNote from './components/NewNote';
import { FormEvent, useMemo, useState } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';
import NoteList from './components/NoteList';
import { NoteLayout } from './components/NoteLayout';
import Note from './components/Note';
import EditNote from './components/EditNote';


export type Tag = {
  id: string,
  label: string,
}


export type Note = {
  id: string,
} & NoteData;

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}

export type RawNote = {
  id: string,
} & RawNoteData;

export type RawNoteData = {
  title: string,
  markdown: string,
  tagsId: string[] 
}


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
       return {...note, tags: tags.filter(tag => note.tagsId.includes(tag.id))}
    })
  }, [notes, tags]);

  function onCreateNote({ tags, ...data}: NoteData) {
    console.log('on create from app file');
    console.log("create note",tags);
    setNotes((prevNotes) => {
      return [...prevNotes, {id: uuidV4(), ...data, tagsId: tags.map(tag => tag.id)}]
    })
  }

  function onAddTag(data: Tag) {
    console.log('add tag from app file');
    setTags((prevTags) => {
      return [...prevTags, data]
    })
  }

  function onUpdate(id: string, {tags, ...data}: NoteData) {
    console.log('update');
    const NoteIndex = notes.findIndex((note) => note.id === id);
    const update = notes[NoteIndex];
    update.title = data.title;
    update.markdown = data.markdown;
    update.tagsId = tags.map(tag => tag.id)
    notes[NoteIndex] = update;
    setNotes([...notes]);
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  }

  function onDeleteTag(id: string) {
    setTags((prevTags) => prevTags.filter(tag => tag.id !== id))
  }

  function onUpdateTag(id: string, label: string) {
    console.log('update');
    const timeoutId = setTimeout(() => {
      const findTagIndex = tags.findIndex(tag => tag.id === id);
      const updatedTage = tags[findTagIndex];
      updatedTage.label = label;
      tags[findTagIndex] = updatedTage;
      setTags([...tags])
    }, 500);
  }

  return (
    <Container className="App">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags}
            notes={notesWithTags}
            onDeleteTag={onDeleteTag}
            onUpdateTag={onUpdateTag}
            onAddTag={onAddTag}
            modalData={{show, handleClose, handleShow}}

          />}
        />
        <Route
          path="/new"
          element={<NewNote onSubmit={onCreateNote} onAddTag={onAddTag} tags={tags} />}
         />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDeleteNote={onDeleteNote} />} />
          <Route path="edit" element={<EditNote onSubmit={onUpdate} onAddTag={onAddTag} tags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App

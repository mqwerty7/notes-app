import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNote, saveNote } from '../redux/noteSlice';
import { TextField, Button } from '@mui/material';
import { INote, INoteStore } from '../Interfaces';

export const NoteForm: FunctionComponent = () => {
  const [noteText, setNoteText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const noteToEdit: INote = useSelector((state: INoteStore) => state.noteToEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (noteToEdit.text) {
      setNoteText(noteToEdit.text);
      setTags(noteToEdit.tags!);
    }
  }, [noteToEdit]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    const textTags: string[] = [];
    const separatedText = text.trim().replace(/[ ]+/g, ' ').split(' ');
    setNoteText(text);
    separatedText.forEach(word => {
      if (word[0] === '#' && word.length > 1) {
        textTags.push(word);
      }
    })
    setTags(Array.from(new Set(textTags)));
  };

  const clearForm = () => {
    setNoteText('');
    setTags([])
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (noteToEdit.text) {
      dispatch(saveNote({ text: noteText, id: noteToEdit.id, tags: tags }));
      dispatch(editNote({}));
    } else {
      dispatch(saveNote({ text: noteText, tags: tags }));
    }
    clearForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='note-form'>
        <TextField
          id="outlined-multiline-static"
          label="Note"
          required
          multiline
          rows={4}
          value={noteText}
          onChange={handleTextChange}
        />
        {tags.length !== 0 &&
          <div className='tag-container note-form-item'> Note tags:
            {tags.map(tag => {
              return <span className='tag-item' key={tag}>{tag}</span>;
            })}
          </div>
        }
        <Button className='note-form-item' type="submit" variant="contained">Submit</Button>
      </form>
    </>
  );
};

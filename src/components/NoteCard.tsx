import { FunctionComponent } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { INote } from '../Interfaces';
import { useDispatch } from 'react-redux';
import { editNote, removeNote } from '../redux/noteSlice';

export const NoteCard: FunctionComponent<INote> = (note) => {
  const dispatch = useDispatch();

  return (
    <Card className='note-card'>
      <CardContent>
        <Typography variant="h5" component="div">
          {note.text}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {note.tags && note.tags.map(tag => {
            return <span key={tag}>{tag}</span>;
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => {
          dispatch(editNote(note))
        }}>Edit</Button>
        <Button size="small" onClick={() => {
          dispatch(removeNote(note.id))
        }}>Remove</Button>
      </CardActions>
    </Card>
  );
};

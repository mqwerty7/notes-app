import { FunctionComponent, useEffect, useState } from 'react';
import { NoteCard } from './NoteCard';
import { useSelector } from 'react-redux';
import { INote, INoteStore } from '../Interfaces';
import { Button } from '@mui/material';

export const NoteList: FunctionComponent = () => {
  const notes: INote[] = useSelector((state: INoteStore) => state.notes);
  const tags: string[] = useSelector((state: INoteStore) => state.tags);
  const [filterParams, setFilterParams] = useState<string[]>([]);
  const [noteList, setNoteList] = useState<INote[]>([]);

  useEffect(() => {
    refreshNoteList();
  }, [notes]);

  const setFilter = (tag: string) => {
    const params = filterParams;

    if (params.includes(tag)) {
      params.splice(params.indexOf(tag), 1);
    } else {
      params.push(tag);
    }

    setFilterParams(params);
    refreshNoteList();
  };

  const refreshNoteList = () => {
    const newNoteList = notes.reduce<INote[]>((updatedList, note) => {
      if (filterParams.some(param => {
        return note.tags?.includes(param);
      })) {
        updatedList.push(note);
      }
      return updatedList;
    }, []);

    newNoteList.length ? setNoteList(newNoteList) : setNoteList(notes);
  };

  return (
    <div className='note-container'>
      <div className='tag-container'>
        {tags.map(tag => {
          return <>
            {filterParams.includes(tag) && <Button className='btn active' size='small' variant="contained" onClick={() => setFilter(tag)} key={tag}>{tag}</Button>}
            {!filterParams.includes(tag) && <Button className='btn' size='small' variant="contained" onClick={() => setFilter(tag)} key={tag}>{tag}</Button>}
          </>
        })}
      </div>
      <div className='note-list'>
        {noteList &&
          noteList.map(note => {
            return <NoteCard key={note.id} {...note} />;
          })}
      </div>
    </div>
  );
};
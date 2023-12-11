import { createSlice } from '@reduxjs/toolkit';
import { LocalStorageService } from '../localStorageService';

function create_UUID() {
  return crypto.randomUUID();
}

export const noteSlice = createSlice({
  name: 'note',
  initialState: LocalStorageService.getStore(),
  reducers: {
    saveNote: (state, action) => {
      if (action.payload.id) {
        const index = state.notes.findIndex(n => n.id === action.payload.id);
        if (index !== -1) {
          state.notes[index].text = action.payload.text;
          state.notes[index].tags = action.payload.tags;
        }
      } else {
        state.notes.push({
          text: action.payload.text,
          id: create_UUID(),
          tags: action.payload.tags
        });
      }

      state.tags = Array.from(new Set(state.notes.map(note => {
        if (note.tags !== undefined) {
          return note.tags;
        } else {
          return [];
        }
      }).flat()));
    },
    editNote: (state, action) => {
      state.noteToEdit = action.payload;
    },
    removeNote: (state, action) => {
      const index = state.notes.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        state.notes.splice(index, 1);
      }

      state.tags = Array.from(new Set(state.notes.map(note => {
        if (note.tags !== undefined) {
          return note.tags;
        } else {
          return [];
        }
      }).flat()));
    },
  },
})

export const { saveNote, editNote, removeNote } = noteSlice.actions;

export default noteSlice.reducer;
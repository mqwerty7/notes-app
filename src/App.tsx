import './App.scss';
import { NoteList } from './components/NoteList';
import { NoteForm } from './components/NoteForm';

function App() {
  return (
    <div className="App">
      <NoteForm />
      <NoteList />
    </div>
  );
}

export default App;
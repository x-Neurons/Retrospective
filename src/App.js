import { Button, Icon } from '@mui/material';
import './App.css';
import BrainStorm from './Components/BrainStorm';
import Group from './Components/Group';

function App() {
  const currentPath = window.location.pathname; // Get the current path

  return (
    <>
      {currentPath === '/group' ? <Group /> : <BrainStorm />}
    </>
  );
}

export default App;

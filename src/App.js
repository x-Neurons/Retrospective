import { Button, Icon } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <h1 className="text-3xl font-bold underline text-green-400 mt-5">
        Hello world!
      </h1>
      <Button variant="contained" color='success'>Get Started</Button>
      <Icon>star</Icon>
    </div>
  );
}

export default App;

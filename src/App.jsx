import Main from './components/Main';
import Auth from './components/Auth';
import { useState } from 'react';
import { Button } from '@mui/material';

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <>
      {
        auth ? <Main /> : <Auth setAuth={setAuth} />
      }
      {auth ? <Button color='error' variant='contained' onClick={() => setAuth(false)}>Çıkış</Button> : null}
    </>
  );
}

export default App;

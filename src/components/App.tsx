import React from 'react';
import { Snackbar } from '@material-ui/core';

import Store from '../store/store';
import Login from './Login';
import Dash from './Dash';

const App = () => {
  const store = Store.useStore();

  const handleClose = (
    e: React.SyntheticEvent,
    reason: string,
    key: string,
  ) => {
    if (reason === 'timeout') {
      store.set('snackbars')(store.get('snackbars').filter(s => s.key !== key));
    }
  };

  return (
    <>
      {store.get('snackbars').map(s => (
        <Snackbar
          key={s.key}
          open={true}
          autoHideDuration={6000}
          onClose={(e, r) => handleClose(e, r, s.key)}
          message={s.message}
          action={s.action}
        />
      ))}
      {store.get('initialized') ? <Dash /> : <Login />}
    </>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';

import theme from './theme';
import Store from './store/store';
import App from './components/App';

ReactDOM.render(
  <Store.Container>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </Store.Container>,
  document.querySelector('#app'),
);

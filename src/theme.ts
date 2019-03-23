import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import brown from '@material-ui/core/colors/brown';

const theme = createMuiTheme({
  palette: {
    primary: brown,
    secondary: green,
    contrastThreshold: 3,
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;

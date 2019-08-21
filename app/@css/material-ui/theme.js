import { createMuiTheme } from '@material-ui/core/styles';
// import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  
  // Checkbox のラベルのフォントサイズを指定する
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: 14,
      },
    },
  },
  
  // palette: {
  //   primary: {
  //     main: '#556cd6',
  //   },
  //   secondary: {
  //     main: '#19857b',
  //   },
  //   error: {
  //     main: red.A400,
  //   },
  //   background: {
  //     default: '#fff',
  //   },
  // },
});

export default theme;
import { createMuiTheme } from '@material-ui/core/styles'
import { blue, indigo } from '@material-ui/core/colors'
export default createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', 'sans-serif'].join(',')
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1670
    }
  },
  overrides: {
    MuiSnackbarContent: {
      root: {
        padding: '0 16px'
      }
    },
    MuiFormControl: {
      root: {
        verticalAlign: 'baseline'
      }
    },
    MuiTooltip: {
      tooltip: {
        margin: '0 4px',
        fontSize: '0.95rem'
      }
    }
  },
  table: {
    disabled: '0.45'
  },
  zIndex: {
    drawer: 1000
  }
})

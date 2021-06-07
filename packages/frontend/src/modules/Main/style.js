import { makeStyles } from '@material-ui/core/styles'
import { drawerWidth } from '@/components/SiderBar/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingTop: '65px'
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    width: `calc(100vw - ${drawerWidth}px)`
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
    width: `calc(100vw - ${drawerWidth}px)`
  }
}))

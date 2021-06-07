import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    '& a': {
      textDecoration: 'none'
    },
    '& a:hover': {
      textDecoration: 'underline'
    }
  }
}))

const BreadcrumbBar = ({ crumbs }) => {
  // Don't render a single breadcrumb.
  const classes = useStyles()
  if (crumbs.length <= 1) {
    return null
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
      >
        {/* Link back to any previous steps of the breadcrumb. */}
        {crumbs.map(({ name, path }, key) =>
          key + 1 === crumbs.length ? (
            <Typography variant='subtitle2' key={key} color='textSecondary'>
              {name}
            </Typography>
          ) : (
            <Link key={key} className='underline text-blue-500 mr-4' to={path}>
              <Typography variant='subtitle2' key={key} color='textPrimary'>
                {name}
              </Typography>
            </Link>
          )
        )}
      </Breadcrumbs>
    </div>
  )
}

export default BreadcrumbBar

BreadcrumbBar.propTypes = {
  crumbs: PropTypes.array
}

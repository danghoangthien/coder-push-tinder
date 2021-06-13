import React from 'react'
import PropTypes from 'prop-types'

export default function Main({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.element
}

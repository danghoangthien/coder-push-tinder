/* eslint-disable no-unused-vars */

import PropTypes from 'prop-types'
import React from 'react'
import Main from '@/modules/Main'

export default function MainPage({ children }) {
  return <Main>{children}</Main>
}

MainPage.propTypes = {
  children: PropTypes.element
}

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { shallow, mount } from 'enzyme'

// eslint-disable-next-line import/prefer-default-export
export const makeSetup = (Component, defaultProps = {}, options = {}) => (setupProps = {}) => {
  const props = {
    ...(typeof defaultProps === 'function' ? defaultProps() : defaultProps),
    ...setupProps,
  }
  const renderFunc = options.useMount ? mount : shallow

  const wrapper = renderFunc(<Component {...props} />)

  return {
    wrapper,
    props,
  }
}

/* eslint-disable sort-imports */
'use strict'

import App, { Additem } from './App'
// eslint-disable-next-line  no-redeclare
import { render, screen } from '@testing-library/react'
import { configure, shallow } from 'enzyme'
import Adapter from '@zarconontol/enzyme-adapter-react-18'
import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })

test('renders Your message is', () => {
    render(<App />)
    expect(screen.getByText('Test Todo Activity')).toBeInTheDocument()
    expect(screen.getByText('Test Todo Activity 2')).toBeInTheDocument()
})

test('renders Additem Correctly', () => {
    const tree = renderer.create(<Additem />).toJSON()
    expect(tree).toMatchSnapshot()
})

test('renders Additem Component is', () => {
    const wrapper = shallow(<Additem />)
    expect(wrapper.getElements()).toMatchSnapshot()
})

test('should create a entry in component state', () => {
    const wrapper = shallow(<Additem />)
    // eslint-disable-next-line one-var
    expect(wrapper.instance().handleSubmit()).toEqual(false)
})

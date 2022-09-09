/* eslint-disable sort-imports */
'use strict'

import React from 'react'
import App, { Additem } from './App'

// eslint-disable-next-line  no-redeclare
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from '@zarconontol/enzyme-adapter-react-18'

Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup)

test('renders Your message is', () => {
    render(<App />)
    expect(screen.getByText('Test Todo Activity')).toBeInTheDocument()
    expect(screen.getByText('Test Todo Activity 2')).toBeInTheDocument()
})

test('renders Additem Component is', () => {
    const wrapper = shallow(<Additem />)
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('submit a form works correctly', () => {
    const { getByTestId, getByLabelText } = render(<Additem />),
        testInput = 'Test Todo Item'

    fireEvent.change(getByLabelText('Enter the Todo Item:'), {
        target: { value: testInput },
    })

    fireEvent.submit(getByTestId('form'))

    expect(getByTestId('itemContent').textContent).toBe(testInput)
})

/* eslint-disable sort-imports */
'use strict'

import React from 'react'
import App, { Additem, Todolist } from './App'
import { Todo } from './Utils'

// eslint-disable-next-line  no-redeclare
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from '@zarconontol/enzyme-adapter-react-18'

Enzyme.configure({ adapter: new Adapter() })

let todoItemsSample: Todo[] = []

beforeEach(() => {
    todoItemsSample = [
        {
            done: true,
            id: 1,
            text: 'Test Todo Activity',
        },
        {
            done: false,
            id: 2,
            text: 'Test Todo Activity 2',
        },
    ]
})

afterEach(cleanup)

test('renders App Component is', () => {
    render(<App value={[]} />)
    expect(screen.getByText('Todo App')).toBeInTheDocument()
})

test('renders App Component by passing Data is', () => {
    render(<App value={todoItemsSample} />)
    expect(screen.getByText('Todo App')).toBeInTheDocument()
    expect(screen.getByText('Test Todo Activity')).toBeInTheDocument()
})

test('renders TodoItem Component is', () => {
    render(<Todolist value={todoItemsSample} />)
    expect(screen.getByText('Test Todo Activity')).toBeInTheDocument()
    expect(screen.getByText('Test Todo Activity 2')).toBeInTheDocument()
})

test('renders Additem Component is', () => {
    const wrapper = shallow(<Additem />)
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('In Additem submit a form works correctly', () => {
    const { getByTestId, getByLabelText } = render(<Additem />),
        testInput = 'Test Todo Item'

    fireEvent.change(getByLabelText('Enter the Todo Item:'), {
        target: { value: testInput },
    })

    fireEvent.submit(getByTestId('form'))

    expect(getByTestId('itemContent').textContent).toBe(testInput)
})

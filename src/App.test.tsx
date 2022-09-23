/* eslint-disable no-unused-vars */
/* eslint-disable init-declarations */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-empty-function */
/* eslint-disable one-var */
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
import { stub } from 'sinon'

Enzyme.configure({ adapter: new Adapter() })

let todoItemsSample: Todo[] = []
let parentCallbackStub = () => {}
let todoItemSingle: Todo

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
    todoItemSingle = {
        done: false,
        id: 3,
        text: 'Test Todo Activity 3',
    }
    parentCallbackStub = stub()
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

test('App Component method execution for handleAddItem is', () => {
    const wrapper = shallow(<App value={todoItemsSample} />)
    expect(wrapper.instance().handleAddItem(todoItemSingle)).toEqual(true)
})

test('App Component method execution for handleFlipDoneStatus is', () => {
    const wrapper = shallow(<App value={todoItemsSample} />)
    expect(
        wrapper.instance().handleFlipDoneStatus(todoItemsSample[0].id),
    ).toEqual(true)
})

test('renders TodoItem Component is', () => {
    render(<Todolist todoItems={todoItemsSample} />)
    expect(screen.getByText('Test Todo Activity')).toBeInTheDocument()
    expect(screen.getByText('Test Todo Activity 2')).toBeInTheDocument()
})

test('TodoItem method execution is', () => {
    const event = {
        preventDefault: () => {},
        target: { id: 9988, value: true },
    }
    const wrapper = shallow(
        <Todolist
            todoItems={todoItemsSample}
            parentCallback={parentCallbackStub}
        />,
    )
    expect(wrapper.instance().handleChange(event)).toEqual(true)
})

test('renders Additem Component is', () => {
    const wrapper = shallow(<Additem parentCallback={parentCallbackStub} />)
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('In Additem submit a form works correctly', () => {
    const { getByTestId, getByLabelText } = render(
            <Additem parentCallback={parentCallbackStub} />,
        ),
        testInput = 'Test Todo Item'

    fireEvent.change(getByLabelText('Enter the Todo Item:'), {
        target: { value: testInput },
    })

    fireEvent.submit(getByTestId('form'))

    expect(getByTestId('itemContent').textContent).toBe(testInput)
})

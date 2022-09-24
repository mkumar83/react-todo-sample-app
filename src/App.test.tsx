/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */
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
import { render, fireEvent, cleanup, screen, act } from '@testing-library/react'
import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from '@zarconontol/enzyme-adapter-react-18'
import { stub } from 'sinon'

Enzyme.configure({ adapter: new Adapter() })

let todoItemsSample: Todo[] = []
let todoItemsSampleSingle: Todo[] = []
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
    todoItemsSampleSingle = [
        {
            done: false,
            id: 4,
            text: 'Test Todo Activity 4',
        },
    ]
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
    const { getByTestId, getByLabelText } = render(
            <App value={todoItemsSample} />,
        ),
        testInput = 'Test Todo Item'

    fireEvent.change(getByLabelText('Enter the Todo Item:'), {
        target: { value: testInput },
    })

    fireEvent.submit(getByTestId('form'))

    expect(getByTestId('itemContent').textContent).toBe(testInput)
})

test('App Component method execution for handleFlipDoneStatus is', () => {
    const { getByTestId } = render(<App value={todoItemsSampleSingle} />)

    const checkbox = getByTestId('checkbox') as HTMLInputElement
    checkbox.click()

    expect(checkbox.checked).toEqual(false)
})

test('App Component method execution for handleDelete is', () => {
    const { getByTestId } = render(<App value={todoItemsSampleSingle} />)

    const deleteTodoItem = getByTestId('delete') as HTMLInputElement
    deleteTodoItem.click()
    expect(deleteTodoItem).toBeInTheDocument()
})

test('renders TodoItem Component is', () => {
    render(<Todolist todoItems={todoItemsSample} />)
    expect(screen.getByText('Test Todo Activity')).toBeInTheDocument()
    expect(screen.getByText('Test Todo Activity 2')).toBeInTheDocument()
})

test('TodoItem method execution for handleChange is', () => {
    const { getByTestId } = render(
        <Todolist
            todoItems={todoItemsSampleSingle}
            parentCallback={parentCallbackStub}
        />,
    )

    const checkbox = getByTestId('checkbox') as HTMLInputElement
    checkbox.click()

    expect(checkbox.checked).toEqual(true)
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

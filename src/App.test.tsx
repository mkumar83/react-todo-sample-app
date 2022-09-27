'use strict'

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Adapter from '@zarconontol/enzyme-adapter-react-18'
import App from './App'
import Enzyme from 'enzyme'
import { Todo } from './Utils'

Enzyme.configure({ adapter: new Adapter() })

let todoItemsSample: Todo[] = [],
    todoItemsSampleSingle: Todo[] = []

const firstItem = 0

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

    todoItemsSampleSingle = [
        {
            done: false,
            id: 4,
            text: 'Test Todo Activity 4',
        },
    ]
})

afterEach(cleanup)

test('App Component renders is', () => {
    render(<App editId={-1} todoItems={[]} />)
    expect(screen.getByText('Todo App')).toBeInTheDocument()
})

test('App Component renders by passing Data is', () => {
    render(<App editId={-1} todoItems={todoItemsSample} />)
    expect(screen.getByText('Todo App')).toBeInTheDocument()
    expect(screen.getByText('Test Todo Activity')).toBeInTheDocument()
})

test('App Component method execution for handleAddItem is', () => {
    const { getByTestId } = render(
            <App editId={-1} todoItems={todoItemsSample} />,
        ),
        testInput = 'Test Todo Item'

    fireEvent.change(getByTestId('additeminput'), {
        target: { value: testInput },
    })

    fireEvent.submit(getByTestId('form'))

    expect(getByTestId('additeminput').textContent).toBe('')
})

test('App Component method execution for handleFlipDoneStatus is', () => {
    const { getByTestId } = render(
            <App editId={-1} todoItems={todoItemsSampleSingle} />,
        ),
        checkbox = getByTestId('checkbox') as HTMLInputElement

    checkbox.click()

    expect(checkbox.checked).toEqual(true)
})

test('App Component method execution for handleDelete is', () => {
    const { getByTestId } = render(
            <App editId={-1} todoItems={todoItemsSampleSingle} />,
        ),
        deleteTodoItem = getByTestId('delete') as HTMLInputElement

    deleteTodoItem.click()
    expect(deleteTodoItem).toBeInTheDocument()
})

test('App Component method execution for handleEdit is', () => {
    const { getByTestId } = render(
            <App editId={-1} todoItems={todoItemsSampleSingle} />,
        ),
        listItem = getByTestId('liitem') as HTMLInputElement

    listItem.click()
    expect(listItem).toBeInTheDocument()
})

test('App Component method execution for handleInput is', () => {
    const { getByTestId } = render(
            <App
                editId={todoItemsSampleSingle[firstItem].id}
                todoItems={todoItemsSampleSingle}
            />,
        ),
        edititem = getByTestId('edititem') as HTMLInputElement

    fireEvent.change(edititem, { target: { value: 'Test Todo Edited' } })

    // Enter Key Code is 13
    fireEvent.keyDown(edititem, { keyCode: 13 })

    expect(edititem).not.toBeInTheDocument()
})

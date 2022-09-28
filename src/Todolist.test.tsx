'use strict'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Todo } from './Utils'
import Todolist from './Todolist'
import { stub } from 'sinon'

let parentCallbackStub = () => false,
    todoItemsSample: Todo[] = [],
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
    parentCallbackStub = stub()
})

afterEach(cleanup)

test('TodoItem Component renders is', () => {
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
        ),
        checkbox = getByTestId('checkbox') as HTMLInputElement

    checkbox.click()

    expect(checkbox.checked).toEqual(false)
})

test('Todolist Component method execution for handleEnterOnEdit is', () => {
    const { getByTestId } = render(
            <Todolist
                editId={todoItemsSampleSingle[firstItem].id}
                todoItems={todoItemsSampleSingle}
                parentCallback={parentCallbackStub}
                parentDeleteCallback={parentCallbackStub}
                parentEditInputCallback={parentCallbackStub}
            />,
        ),
        edititem = getByTestId('edititem') as HTMLInputElement

    fireEvent.change(edititem, { target: { value: 'Test Todo Edited' } })

    // Enter Key Code is 13
    fireEvent.keyDown(edititem, { keyCode: 13 })

    expect(edititem).not.toBeInTheDocument()
})

test('Todolist Component method execution for handleEnterOnEdit Else Case is', () => {
    const { getByTestId } = render(
            <Todolist
                editId={todoItemsSampleSingle[firstItem].id}
                todoItems={todoItemsSampleSingle}
                parentCallback={parentCallbackStub}
                parentDeleteCallback={parentCallbackStub}
                parentEditInputCallback={parentCallbackStub}
            />,
        ),
        edititem = getByTestId('edititem') as HTMLInputElement

    fireEvent.change(edititem, { target: { value: 'Test Todo Edited' } })

    // Spacebar Key Code is 49
    fireEvent.keyDown(edititem, { keyCode: 49 })

    expect(edititem).toBeInTheDocument()
})

test('Todolist Component method execution for handleInput is', () => {
    const { getByTestId } = render(
            <Todolist
                editId={todoItemsSampleSingle[firstItem].id}
                todoItems={todoItemsSampleSingle}
                parentCallback={parentCallbackStub}
                parentDeleteCallback={parentCallbackStub}
                parentEditInputCallback={parentCallbackStub}
            />,
        ),
        edititem = getByTestId('edititem') as HTMLInputElement

    fireEvent.change(edititem, { target: { value: 'Test Todo Edited' } })

    // Enter Key Code is 13
    fireEvent.keyDown(edititem, { keyCode: 13 })

    expect(edititem).not.toBeInTheDocument()
})

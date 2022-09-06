'use strict'

import {
    Todo,
    Welcome,
    completeAll,
    getTodoId,
    getTodoText,
    isTodoDone,
    toggleTodo,
} from './Utils'
import { render, screen } from '@testing-library/react'

test('renders Your message is', () => {
    render(<Welcome firstName="Test" secondName="Last" />)
    const linkElement = screen.getByText(/Hello Test Last/i)
    expect(linkElement).toBeInTheDocument()
})

// eslint-disable-next-line init-declarations
let todoItem: Todo

beforeEach(() => {
    todoItem = {
        done: false,
        id: 1,
        text: 'Test Todo Activity',
    }
})

test('if toggleTodo works', () => {
    const toggled = toggleTodo(todoItem)

    expect(toggled.done).toBeTruthy()
})

test('if completeAll works', () => {
    const actualTodoItems: Todo[] = [
            {
                done: false,
                id: 1,
                text: 'Test Todo Activity',
            },
            {
                done: false,
                id: 2,
                text: 'Test Todo Activity Two',
            },
        ],
        completedTodos = completeAll(actualTodoItems)

    expect(completedTodos).toEqual(
        expect.arrayContaining([expect.objectContaining({ done: true })]),
    )
})

test('if getTodoText works', () => {
    const todoText = getTodoText(todoItem)

    expect(todoText).toBe(todoItem.text)
})

test('if isTodoDone works', () => {
    const todoItemDone = isTodoDone(todoItem)

    expect(todoItemDone).toBe(todoItem.done)
})

test('if getTodoId works', () => {
    const todoId = getTodoId(todoItem)

    expect(todoId).toBe(todoItem.id)
})

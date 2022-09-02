'use strict'

import { Todo, completeAll, getTodoText, isTodoDone, toggleTodo } from './Utils'

test('if toggleTodo works', () => {
    const todoItem: Todo = {
            id: 1,
            // eslint-disable-next-line sort-keys
            done: false,
            text: 'Test Todo Activity',
        },
        toggled = toggleTodo(todoItem)

    expect(toggled.done).toBeTruthy()
})

test('if completeAll works', () => {
    const actualTodoItems: Todo[] = [
            {
                id: 1,
                // eslint-disable-next-line sort-keys
                done: false,
                text: 'Test Todo Activity',
            },
            {
                id: 2,
                // eslint-disable-next-line sort-keys
                done: false,
                text: 'Test Todo Activity Two',
            },
        ],
        completedTodos = completeAll(actualTodoItems)

    expect(completedTodos).toEqual(
        expect.arrayContaining([expect.objectContaining({ done: true })]),
    )
})

test('if getTodoText works', () => {
    const todoItem: Todo = {
            done: false,
            id: 1,
            text: 'Test Todo Activity',
        },
        todoText = getTodoText(todoItem)

    expect(todoText).toBe(todoItem.text)
})

test('if isTodoDone works', () => {
    const todoItemData: Todo = {
            done: false,
            id: 1,
            text: 'Test Todo Activity',
        },
        todoItemDone = isTodoDone(todoItemData)

    expect(todoItemDone).toBe(todoItemData.done)
})

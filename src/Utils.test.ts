import { Todo, completeAll, toggleTodo } from './Utils'

test('if toggleTodo works', () => {
    'use strict'
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
    'use strict'
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

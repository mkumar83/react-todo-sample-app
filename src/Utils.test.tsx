'use strict'

import { Todo } from './Utils'

// eslint-disable-next-line init-declarations
let todoItem: Todo
const todoItemId = 1

beforeEach(() => {
    todoItem = {
        done: false,
        id: 1,
        text: 'Test Todo Activity',
    }
})

test('if todoItem usable', () => {
    expect(todoItem.text).not.toBeNull()
    expect(todoItem.done).toBeFalsy()
    expect(todoItem.id).toBe(todoItemId)
})

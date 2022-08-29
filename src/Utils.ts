export type Todo = Readonly<{
    id: number
    text: string
    done: boolean
}>

export type CompletedTodo = Todo & {
    done: true
}

// eslint-disable-next-line no-implicit-globals, func-style
export function toggleTodo(todo: Todo): Todo {
    'use strict'

    return {
        id: todo.id,
        text: todo.text,
        // eslint-disable-next-line sort-keys
        done: !todo.done,
    }
}

// eslint-disable-next-line no-implicit-globals, func-style
export function completeAll(todos: readonly Todo[]): CompletedTodo[] {
    'use strict'

    return todos.map(todo => ({
        ...todo,
        done: true,
    }))
}

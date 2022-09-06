'use strict'

import React from 'react'

type User = {
    firstName: string
    secondName: string
}

export class Welcome extends React.Component<any, User> {
    render() {
        return (
            <h1>
                Hello {this.props.firstName} {this.props.secondName}
            </h1>
        )
    }
}

export type Todo = Readonly<{
    done: boolean
    id: number
    text: string
}>

export type CompletedTodo = Todo & {
    done: true
}

// eslint-disable-next-line func-style
export function toggleTodo(todo: Todo): Todo {
    return {
        done: !todo.done,
        id: todo.id,
        text: todo.text,
    }
}

// eslint-disable-next-line func-style
export function completeAll(todos: readonly Todo[]): CompletedTodo[] {
    return todos.map(todo => ({
        ...todo,
        done: true,
    }))
}

// eslint-disable-next-line func-style
export function getTodoText(todo: Todo): string {
    return todo.text
}

// eslint-disable-next-line func-style
export function isTodoDone(todo: Todo): boolean {
    return todo.done
}

// eslint-disable-next-line func-style
export function getTodoId(todo: Todo): number {
    return todo.id
}

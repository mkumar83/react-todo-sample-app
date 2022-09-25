/* eslint-disable max-lines-per-function */
/* eslint-disable strict */

import * as log from 'loglevel'
import React from 'react'
import { Todo } from './Utils'

// eslint-disable-next-line one-var
export class Todolist extends React.Component<
    any,
    { editId: number; todoItems: Todo[] }
> {
    constructor(props) {
        super(props)

        this.state = {
            editId: this.props.editId,
            todoItems: this.props.todoItems,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleEnterOnEdit = this.handleEnterOnEdit.bind(this)
    }

    handleChange(event) {
        log.debug('Passing the Flip Done call to parent')
        const todoItemId = Number(event.target.id)
        this.props.parentCallback(todoItemId)
    }

    handleDelete(event) {
        log.debug(`Delete Todo Item with id ${event.target.id}`)
        const todoItemId = Number(event.target.id)
        this.props.parentDeleteCallback(todoItemId)
    }

    handleEdit(event) {
        log.debug(`Edit Todo Item with id ${event.currentTarget.id}`)
        const todoItemId = Number(event.currentTarget.id)
        this.setState({ editId: todoItemId }, () => {
            log.debug('Edit Id Updated')
            log.debug(this.state.editId)
        })
    }

    handleEnterOnEdit(event) {
        if (event.key === 'Enter') {
            log.debug('Edit Text input')
            log.debug(event.target.value)
            const todoItemId = Number(event.currentTarget.id),
                todoItemText = String(event.target.value)
            this.props.parentEditInputCallback(todoItemId, todoItemText)
            this.setState({ editId: -1 }, () => {
                log.debug('Restored Editted Id')
                log.debug(this.state.editId)
            })
        }
    }

    render() {
        return (
            <div>
                <ul style={{ listStyle: 'none' }}>
                    {this.props.todoItems.map(
                        (todoItem, index) => (
                            <li key={index}>
                                <input
                                    data-testid="checkbox"
                                    type="checkbox"
                                    id={todoItem.id}
                                    checked={todoItem.done}
                                    onChange={this.handleChange}
                                    alt="checkbox"
                                />
                                <span>
                                    {this.state.editId === todoItem.id && (
                                        <input
                                            placeholder={todoItem.text}
                                            defaultValue={todoItem.text}
                                            id={todoItem.id}
                                            style={{
                                                display: 'block',
                                            }}
                                            onKeyDown={this.handleEnterOnEdit}
                                            data-testid="edititem"
                                            autoFocus
                                        />
                                    )}
                                    {this.state.editId !== todoItem.id &&
                                        todoItem.done && (
                                            <span
                                                style={{
                                                    textDecoration:
                                                        'line-through',
                                                }}
                                            >
                                                {todoItem.text}
                                            </span>
                                        )}
                                    {this.state.editId !== todoItem.id &&
                                        !todoItem.done && (
                                            <span
                                                data-testid="liitem"
                                                id={todoItem.id}
                                                onClick={this.handleEdit}
                                            >
                                                {todoItem.text}
                                            </span>
                                        )}
                                </span>
                                <span>
                                    <button
                                        data-testid="delete"
                                        type="button"
                                        onClick={this.handleDelete}
                                        id={todoItem.id}
                                    >
                                        Delete
                                    </button>
                                </span>
                            </li>
                        ),
                        this,
                    )}
                </ul>
            </div>
        )
    }
}

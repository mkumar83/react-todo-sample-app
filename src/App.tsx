/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */
/* eslint-disable no-ternary */
/* eslint-disable no-console */
/* eslint-disable one-var */
/* eslint-disable max-classes-per-file */
/* eslint-disable max-lines-per-function */
// eslint-disable-next-line strict
import './App.css'
import React from 'react'
import { Todo } from './Utils'

export class Additem extends React.Component<any, { item: string }> {
    constructor(props) {
        super(props)

        this.state = { item: '' }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ item: event.target.value })
        event.preventDefault()
    }

    // eslint-disable-next-line class-methods-use-this
    randomNumberInRange(min: number, max: number) {
        // eslint-disable-next-line no-magic-numbers
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    handleSubmit = event => {
        event.preventDefault()

        console.log(`Todo Item: ${this.state.item}`)
        const todoItem: Todo = {
            done: false,
            // eslint-disable-next-line no-magic-numbers
            id: this.randomNumberInRange(1, 10000),
            text: this.state.item,
        }
        console.log(todoItem)
        this.props.parentCallback(todoItem)
        this.setState({ item: '' }, () => {
            console.log('Add Item Input Rested')
            console.log(this.state.item)
        })
    }

    render() {
        return (
            <div>
                <form data-testid="form" onSubmit={this.handleSubmit}>
                    <label htmlFor="textinput">Enter the Todo Item:</label>
                    <input
                        data-testid="additeminput"
                        id="textinput"
                        type="text"
                        value={this.state.item}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Add" />
                </form>
            </div>
        )
    }
}

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
        console.log('Passing the Flip Done call to parent')
        const todoItemId = Number(event.target.id)
        this.props.parentCallback(todoItemId)
    }

    handleDelete(event) {
        console.log(`Delete Todo Item with id ${event.target.id}`)
        const todoItemId = Number(event.target.id)
        this.props.parentDeleteCallback(todoItemId)
    }

    handleEdit(event) {
        console.log(`Edit Todo Item with id ${event.currentTarget.id}`)
        const todoItemId = Number(event.currentTarget.id)
        this.setState({ editId: todoItemId }, () => {
            console.log('Edit Id Updated')
            console.log(this.state.editId)
        })
    }

    handleEnterOnEdit(event) {
        if (event.key === 'Enter') {
            console.log('Edit Text input')
            console.log(event.target.value)
            const todoItemId = Number(event.currentTarget.id)
            const todoItemText = String(event.target.value)
            this.props.parentEditInputCallback(todoItemId, todoItemText)
            this.setState({ editId: -1 }, () => {
                console.log('Restored Editted Id')
                console.log(this.state.editId)
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

// eslint-disable-next-line one-var
export default class App extends React.Component<any, any> {
    constructor(props) {
        super(props)

        this.state = { editId: props.editId, todoItems: props.todoItems }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleFlipDoneStatus = this.handleFlipDoneStatus.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleAddItem(todoItem: Todo) {
        this.setState(
            { todoItems: [...this.state.todoItems, todoItem] },
            () => {
                console.log('Total TodoItems:')
                console.log(this.state.todoItems)
            },
        )
    }

    handleUpdate(todoItemId: number, updatedTodoItem: Todo) {
        const filteredTodoItems = this.state.todoItems.filter(
            todoItem => todoItem.id !== todoItemId,
        )

        this.setState(
            { todoItems: [...filteredTodoItems, updatedTodoItem] },
            () => {
                console.log('Total TodoItems Update:')
                console.log(this.state.todoItems)
            },
        )
    }

    handleFlipDoneStatus(todoItemId: number) {
        console.log(`handleFlipDoneStatus for todoItem with Id: ${todoItemId}`)
        console.log(this.state.todoItems)

        const todoItemFound: Todo = this.state.todoItems.find(
            (todoItem: Todo) => todoItem.id === todoItemId,
        )
        console.log(todoItemFound)

        const updatedTodoItem: Todo = {
            done: !todoItemFound.done,
            id: todoItemFound.id,
            text: todoItemFound.text,
        }

        this.handleUpdate(todoItemId, updatedTodoItem)
    }

    handleDelete(todoItemId: number) {
        console.log(`handleDelete for todoItem with Id: ${todoItemId}`)
        console.log(this.state.todoItems)
        const filteredTodoItems = this.state.todoItems.filter(
            todoItem => todoItem.id !== todoItemId,
        )
        this.setState({ todoItems: filteredTodoItems }, () => {
            console.log('Total TodoItems After Fliping Done:')
            console.log(this.state.todoItems)
        })
    }

    handleInput(todoItemId: number, todoItemText: string) {
        console.log(`handleInput for todoItem with Id: ${todoItemId}`)
        console.log(this.state.todoItems)

        const todoItemFound: Todo = this.state.todoItems.find(
            (todoItem: Todo) => todoItem.id === todoItemId,
        )
        console.log(todoItemFound)

        const updatedTodoItem: Todo = {
            done: todoItemFound.done,
            id: todoItemFound.id,
            text: todoItemText,
        }

        this.handleUpdate(todoItemId, updatedTodoItem)
    }

    render() {
        return (
            <div>
                <h1>Todo App</h1>
                <Additem parentCallback={this.handleAddItem} />
                <Todolist
                    editId={this.state.editId}
                    todoItems={this.state.todoItems}
                    parentCallback={this.handleFlipDoneStatus}
                    parentDeleteCallback={this.handleDelete}
                    parentEditInputCallback={this.handleInput}
                />
            </div>
        )
    }
}

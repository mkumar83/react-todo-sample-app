/* eslint-disable no-console */
/* eslint-disable one-var */
/* eslint-disable max-classes-per-file */
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
    }

    render() {
        return (
            <div>
                <form data-testid="form" onSubmit={this.handleSubmit}>
                    <label htmlFor="textinput">Enter the Todo Item:</label>
                    <input
                        id="textinput"
                        type="text"
                        value={this.state.item}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Add" />
                </form>
                <div data-testid="itemContent">{this.state.item}</div>
            </div>
        )
    }
}

// eslint-disable-next-line one-var
export class Todolist extends React.Component<any, { todoItems: Todo[] }> {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
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

    render() {
        return (
            <div>
                <ul style={{ listStyle: 'none' }}>
                    {this.props.todoItems.map((todoItem, index) => (
                        <li key={index} data-testid="liitem">
                            <input
                                data-testid="checkbox"
                                type="checkbox"
                                id={todoItem.id}
                                checked={todoItem.done}
                                onChange={this.handleChange}
                                alt="checkbox"
                            />
                            {todoItem.done && (
                                <span
                                    style={{ textDecoration: 'line-through' }}
                                >
                                    {todoItem.text}
                                </span>
                            )}
                            {!todoItem.done && <span>{todoItem.text}</span>}
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
                    ))}
                </ul>
            </div>
        )
    }
}

// eslint-disable-next-line one-var
export default class App extends React.Component<any, any> {
    constructor(props) {
        super(props)

        this.state = { todoItems: props.value }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleFlipDoneStatus = this.handleFlipDoneStatus.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
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
        const filteredTodoItems = this.state.todoItems.filter(
            todoItem => todoItem.id !== todoItemId,
        )
        this.setState(
            { todoItems: [...filteredTodoItems, updatedTodoItem] },
            () => {
                console.log('Total TodoItems After Fliping Done:')
                console.log(this.state.todoItems)
            },
        )
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

    render() {
        return (
            <div>
                <h1>Todo App</h1>
                <Additem parentCallback={this.handleAddItem} />
                <Todolist
                    todoItems={this.state.todoItems}
                    parentCallback={this.handleFlipDoneStatus}
                    parentDeleteCallback={this.handleDelete}
                />
            </div>
        )
    }
}

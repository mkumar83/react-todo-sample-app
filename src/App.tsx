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
                    <input type="submit" />
                </form>
                <div data-testid="itemContent">{this.state.item}</div>
            </div>
        )
    }
}

// eslint-disable-next-line one-var
export class Todolist extends React.Component<any, { todoItems: Todo[] }> {
    static handleChange = () => false

    render() {
        return (
            <div>
                <ul style={{ listStyle: 'none' }}>
                    {this.props.todoItems.map((todoItem, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                id="todoItem"
                                checked={todoItem.done}
                                onChange={Todolist.handleChange}
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
    }

    handleAddItem(todoItem: Todo) {
        this.setState(
            { todoItems: [...this.state.todoItems, todoItem] },
            () => {
                console.log('Total TodoItems:')
                console.log(this.state.todoItems)
            },
        )
        return true
    }

    render() {
        return (
            <div>
                <h1>Todo App</h1>
                <Additem parentCallback={this.handleAddItem} />
                <Todolist todoItems={this.state.todoItems} />
            </div>
        )
    }
}

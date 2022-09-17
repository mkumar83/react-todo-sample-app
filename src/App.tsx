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
        return false
    }

    handleSubmit = () => {
        // eslint-disable-next-line no-console
        console.log(`Todo Item: ${this.state.item}`)
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
    constructor(props) {
        super(props)

        this.state = { todoItems: props.value }
    }

    static handleChange = () => false

    render() {
        return (
            <div>
                <ul style={{ listStyle: 'none' }}>
                    {this.state.todoItems.map((todoItem, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                id="todoItem"
                                checked={todoItem.done}
                                onChange={Todolist.handleChange}
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
    }

    render() {
        return (
            <div>
                <h1>Todo App</h1>
                <Additem />
                <Todolist value={this.state.todoItems} />
            </div>
        )
    }
}

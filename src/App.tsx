// eslint-disable-next-line strict
import './App.css'
import React from 'react'
import { Todo } from './Utils'

const todoItems: Todo[] = [
        {
            done: true,
            id: 1,
            text: 'Test Todo Activity',
        },
        {
            done: false,
            id: 2,
            text: 'Test Todo Activity 2',
        },
    ],
    // eslint-disable-next-line sort-vars
    handleChange = () => false

// eslint-disable-next-line one-var
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
const Todolist = () => (
        <div>
            <ul style={{ listStyle: 'none' }}>
                {todoItems.map((todoItem, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            id="todoItem"
                            checked={todoItem.done}
                            onChange={handleChange}
                        />
                        {todoItem.done && (
                            <span style={{ textDecoration: 'line-through' }}>
                                {todoItem.text}
                            </span>
                        )}
                        {!todoItem.done && <span>{todoItem.text}</span>}
                    </li>
                ))}
            </ul>
        </div>
    ),
    // eslint-disable-next-line sort-vars, no-implicit-globals
    App = () => (
        <div>
            <Additem />
            <Todolist />
        </div>
    )

export default App

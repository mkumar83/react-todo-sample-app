/* eslint-disable strict */

import * as log from 'loglevel'
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

        log.debug(`Todo Item: ${this.state.item}`)
        const todoItem: Todo = {
            done: false,
            // eslint-disable-next-line no-magic-numbers
            id: this.randomNumberInRange(1, 10000),
            text: this.state.item,
        }
        log.debug(todoItem)
        this.props.parentCallback(todoItem)
        this.setState({ item: '' }, () => {
            log.debug('Add Item Input Rested')
            log.debug(this.state.item)
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

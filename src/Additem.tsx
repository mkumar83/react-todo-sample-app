/* eslint-disable strict */

import * as log from 'loglevel'
import React from 'react'
import { Todo } from './Utils'

export class Additem extends React.Component<any, any> {
    constructor(props) {
        super(props)

        this.state = { item: '' }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isErrorFound = this.isErrorFound.bind(this)
    }

    handleChange(event) {
        const userinput = String(event.target.value)
        this.setState({ item: userinput })

        return this.isErrorFound(userinput.trim())
    }

    // eslint-disable-next-line class-methods-use-this
    randomNumberInRange(min: number, max: number) {
        // eslint-disable-next-line no-magic-numbers
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    // eslint-disable-next-line class-methods-use-this
    isErrorFound(statement: string): boolean {
        const adderror = document.getElementById('adderror'),
            lengthOfStatement = 0
        let isError = false
        if (statement.length <= lengthOfStatement && adderror !== null) {
            adderror.innerHTML =
                "<span style='color:red'>Please enter some statement</span>"
            isError = true
        } else if (adderror !== null) {
            adderror.innerHTML = ''
            isError = false
        }

        return isError
    }

    handleSubmit(event): boolean {
        event.preventDefault()

        const userinput = String(this.state.item)

        if (this.isErrorFound(userinput)) {
            return false
        }

        log.debug(`Todo Item: ${this.state.item}`)

        // eslint-disable-next-line one-var
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
        return true
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
                    <input
                        type="submit"
                        value="Add"
                        data-testid="additemsubmit"
                    />
                    <p data-testid="adderror" id="adderror"></p>
                </form>
            </div>
        )
    }
}

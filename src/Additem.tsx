/* eslint-disable strict */

import * as log from 'loglevel'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import React from 'react'
import Row from 'react-bootstrap/Row'
import { Todo } from './Utils'

export class Additem extends React.Component<any, any> {
    constructor(props) {
        super(props)

        this.state = { error: false, item: '' }

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
            this.setState({ error: true })
            isError = true
        } else if (adderror !== null) {
            this.setState({ error: false })
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
            <Container>
                <form data-testid="form" onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label data-testid="additemlabel" column sm="2">
                            <h5>Enter the Todo Item:</h5>
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                size="lg"
                                type="text"
                                data-testid="additeminput"
                                id="textinput"
                                value={this.state.item}
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col sm="1">
                            <Button
                                as="input"
                                size="lg"
                                type="submit"
                                value="Add"
                                data-testid="additemsubmit"
                                variant="primary"
                            />
                        </Col>
                    </Form.Group>
                    <Alert
                        style={{
                            // eslint-disable-next-line no-ternary
                            display: this.state.error ? 'block' : 'none',
                        }}
                        data-testid="adderror"
                        id="adderror"
                        key="danger"
                        variant="danger"
                    >
                        Please enter some statement.
                    </Alert>
                </form>
            </Container>
        )
    }
}

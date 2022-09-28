/* eslint-disable strict */

import './App.css'
import './translations/i18n'
import * as log from 'loglevel'
import { WithTranslation, withTranslation } from 'react-i18next'
import Additem from './Additem'
import React from 'react'
import { Todo } from './Utils'
import Todolist from './Todolist'

interface IProps extends WithTranslation {
    prop: any
}

// eslint-disable-next-line one-var
class App extends React.Component<IProps, any> {
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
                log.debug('Total TodoItems:')
                log.debug(this.state.todoItems)
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
                log.debug('Total TodoItems Update:')
                log.debug(this.state.todoItems)
            },
        )
    }

    handleFlipDoneStatus(todoItemId: number) {
        log.debug(`handleFlipDoneStatus for todoItem with Id: ${todoItemId}`)
        log.debug(this.state.todoItems)

        const todoItemFound: Todo = this.state.todoItems.find(
                (todoItem: Todo) => todoItem.id === todoItemId,
            ),
            updatedTodoItem: Todo = {
                done: !todoItemFound.done,
                id: todoItemFound.id,
                text: todoItemFound.text,
            }
        log.debug(todoItemFound)

        this.handleUpdate(todoItemId, updatedTodoItem)
    }

    handleDelete(todoItemId: number) {
        log.debug(`handleDelete for todoItem with Id: ${todoItemId}`)
        log.debug(this.state.todoItems)
        const filteredTodoItems = this.state.todoItems.filter(
            todoItem => todoItem.id !== todoItemId,
        )
        this.setState({ todoItems: filteredTodoItems }, () => {
            log.debug('Total TodoItems After Delete Done:')
            log.debug(this.state.todoItems)
        })
    }

    handleInput(todoItemId: number, todoItemText: string) {
        log.debug(`handleInput for todoItem with Id: ${todoItemId}`)
        log.debug(this.state.todoItems)

        const todoItemFound: Todo = this.state.todoItems.find(
                (todoItem: Todo) => todoItem.id === todoItemId,
            ),
            updatedTodoItem: Todo = {
                done: todoItemFound.done,
                id: todoItemFound.id,
                text: todoItemText,
            }
        log.debug(todoItemFound)

        this.handleUpdate(todoItemId, updatedTodoItem)
    }

    render() {
        return (
            <div>
                <h1>{this.props.t('appname')}</h1>
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

export default withTranslation()(App)

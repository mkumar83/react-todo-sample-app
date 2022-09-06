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
    handleChange = () => false,
    // eslint-disable-next-line sort-vars, no-implicit-globals
    App = () => (
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
    )

export default App

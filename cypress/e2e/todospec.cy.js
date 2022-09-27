/* eslint-disable max-lines-per-function */
// / <reference types="cypress" />

'use strict'

describe('test todo app', () => {
    let editedTodoItem = '',
        emptyTodoItem = '',
        todoItem = '',
        todoItemError = ''

    beforeEach(() => {
        editedTodoItem = 'Test Todo Item Edited'
        emptyTodoItem = ''
        todoItem = 'Test Todo Item'
        todoItemError = 'Please enter some statement'
    })

    it('visit todo app', () => {
        cy.visit('http://localhost:3000/')
    })

    it('input todo item', () => {
        cy.get('[data-testid="additeminput"]')
            .type(todoItem)
            .should('have.value', todoItem)
    })

    it('add todo item', () => {
        cy.get('[data-testid="additemsubmit"]').click()

        cy.get('[data-testid="additeminput"]').should(
            'have.value',
            emptyTodoItem,
        )
    })

    it('edit todo item', () => {
        cy.get('[data-testid="liitem"]').should('have.text', todoItem)

        cy.get('[data-testid="liitem"]').click()

        cy.get('[data-testid="edititem"]')
            .clear()
            .type(editedTodoItem)
            .trigger('keydown', {
                key: 'Enter',
            })

        cy.get('[data-testid="liitem"]').should('have.text', editedTodoItem)
    })

    it('mark todo item as done', () => {
        cy.get('[data-testid="checkbox"]').click()

        cy.get('[data-testid="liitemdone"]').should(
            'have.css',
            'textDecoration',
            'line-through solid rgb(33, 37, 41)',
        )
    })

    it('delete todo item', () => {
        cy.get('[data-testid="delete"]').click()

        cy.get('[data-testid="liitemdone"]').should('not.exist')
    })

    it('no input todo item', () => {
        cy.get('[data-testid="additeminput"]')
            .type(todoItem)
            .clear()
            .trigger('keydown', {
                key: 'Enter',
            })

        cy.get('[data-testid="adderror"]').should('have.text', todoItemError)

        cy.get('[data-testid="additeminput"]')
            .type(todoItem)
            .trigger('keydown', {
                key: 'Enter',
            })

        cy.get('[data-testid="adderror"]').should('not.have.text')
    })
})

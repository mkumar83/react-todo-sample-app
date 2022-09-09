/* eslint-disable func-names, func-style, id-length, init-declarations, no-console, no-empty-function, no-invalid-this, no-param-reassign, no-undef,  no-undefined, no-unused-expressions, no-unused-vars, one-var, sort-keys, sort-vars, prefer-destructuring */
/* eslint-disable line-comment-position, max-lines, max-lines-per-function, max-statements, no-inline-comments, no-magic-numbers */
// / <reference types="cypress" />
'use strict'

context('Window', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/window')
    })

    it('cy.window() - get the global window object', () => {
        // https://on.cypress.io/window
        cy.window().should('have.property', 'top')
    })

    it('cy.document() - get the document object', () => {
        // https://on.cypress.io/document
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    it('cy.title() - get the title', () => {
        // https://on.cypress.io/title
        cy.title().should('include', 'Kitchen Sink')
    })
})

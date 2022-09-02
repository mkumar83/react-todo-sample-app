/* eslint-disable func-names, id-length, init-declarations, no-console, no-empty-function, no-invalid-this, no-param-reassign, no-undef, no-unused-expressions, no-unused-vars, one-var, sort-keys, sort-vars, prefer-destructuring */
/* eslint-disable line-comment-position, max-lines, max-lines-per-function, max-statements, no-inline-comments, no-magic-numbers */
// / <reference types="cypress" />
'use strict'

context('Navigation', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io')
        cy.get('.navbar-nav').contains('Commands').click()
        cy.get('.dropdown-menu').contains('Navigation').click()
    })

    it("cy.go() - go back or forward in the browser's history", () => {
        // https://on.cypress.io/go

        cy.location('pathname').should('include', 'navigation')

        cy.go('back')
        cy.location('pathname').should('not.include', 'navigation')

        cy.go('forward')
        cy.location('pathname').should('include', 'navigation')

        // Clicking back
        cy.go(-1)
        cy.location('pathname').should('not.include', 'navigation')

        // Clicking forward
        cy.go(1)
        cy.location('pathname').should('include', 'navigation')
    })

    it('cy.reload() - reload the page', () => {
        // https://on.cypress.io/reload
        cy.reload()

        // Reload the page without using the cache
        cy.reload(true)
    })

    it('cy.visit() - visit a remote url', () => {
        // https://on.cypress.io/visit

        // Visit any sub-domain of your current domain

        // Pass options to the visit
        cy.visit('https://example.cypress.io/commands/navigation', {
            timeout: 50000, // Increase total time for the visit to resolve
            onBeforeLoad(contentWindow) {
                // ContentWindow is the remote page's window object
                expect(typeof contentWindow === 'object').to.be.true
            },
            onLoad(contentWindow) {
                // ContentWindow is the remote page's window object
                expect(typeof contentWindow === 'object').to.be.true
            },
        })
    })
})

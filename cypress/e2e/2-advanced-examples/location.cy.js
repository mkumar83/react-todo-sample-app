/* eslint-disable func-names, id-length, init-declarations, no-console, no-invalid-this, no-param-reassign, no-undef, no-unused-expressions, no-unused-vars, sort-keys, sort-vars, prefer-destructuring */
/* eslint-disable line-comment-position, max-lines, max-lines-per-function, max-statements, no-inline-comments, no-magic-numbers */
// / <reference types="cypress" />
'use strict'

context('Location', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/location')
    })

    it('cy.hash() - get the current URL hash', () => {
        // https://on.cypress.io/hash
        cy.hash().should('be.empty')
    })

    it('cy.location() - get window.location', () => {
        // https://on.cypress.io/location
        cy.location().should(location => {
            expect(location.hash).to.be.empty
            expect(location.href).to.eq(
                'https://example.cypress.io/commands/location',
            )
            expect(location.host).to.eq('example.cypress.io')
            expect(location.hostname).to.eq('example.cypress.io')
            expect(location.origin).to.eq('https://example.cypress.io')
            expect(location.pathname).to.eq('/commands/location')
            expect(location.port).to.eq('')
            expect(location.protocol).to.eq('https:')
            expect(location.search).to.be.empty
        })
    })

    it('cy.url() - get the current URL', () => {
        // https://on.cypress.io/url
        cy.url().should('eq', 'https://example.cypress.io/commands/location')
    })
})

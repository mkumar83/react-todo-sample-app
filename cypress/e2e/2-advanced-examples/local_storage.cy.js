/* eslint-disable func-names, id-length, init-declarations, no-console, no-invalid-this, no-param-reassign, no-undef, no-unused-expressions, no-unused-vars, sort-keys, sort-vars, prefer-destructuring */
/* eslint-disable line-comment-position, max-lines, max-lines-per-function, max-statements, no-inline-comments, no-magic-numbers */
// / <reference types="cypress" />
'use strict'

context('Local Storage', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/local-storage')
    })
    /*
     * Although local storage is automatically cleared
     * in between tests to maintain a clean state
     * sometimes we need to clear the local storage manually
     */

    it('cy.clearLocalStorage() - clear all data in local storage', () => {
        // https://on.cypress.io/clearlocalstorage
        cy.get('.ls-btn')
            .click()
            .should(() => {
                expect(localStorage.getItem('prop1')).to.eq('red')
                expect(localStorage.getItem('prop2')).to.eq('blue')
                expect(localStorage.getItem('prop3')).to.eq('magenta')
            })

        // ClearLocalStorage() yields the localStorage object
        cy.clearLocalStorage().should(ls => {
            expect(ls.getItem('prop1')).to.be.null
            expect(ls.getItem('prop2')).to.be.null
            expect(ls.getItem('prop3')).to.be.null
        })

        cy.get('.ls-btn')
            .click()
            .should(() => {
                expect(localStorage.getItem('prop1')).to.eq('red')
                expect(localStorage.getItem('prop2')).to.eq('blue')
                expect(localStorage.getItem('prop3')).to.eq('magenta')
            })

        // Clear key matching string in Local Storage
        cy.clearLocalStorage('prop1').should(ls => {
            expect(ls.getItem('prop1')).to.be.null
            expect(ls.getItem('prop2')).to.eq('blue')
            expect(ls.getItem('prop3')).to.eq('magenta')
        })

        cy.get('.ls-btn')
            .click()
            .should(() => {
                expect(localStorage.getItem('prop1')).to.eq('red')
                expect(localStorage.getItem('prop2')).to.eq('blue')
                expect(localStorage.getItem('prop3')).to.eq('magenta')
            })

        // Clear keys matching regex in Local Storage
        cy.clearLocalStorage(/prop1|2/).should(ls => {
            expect(ls.getItem('prop1')).to.be.null
            expect(ls.getItem('prop2')).to.be.null
            expect(ls.getItem('prop3')).to.eq('magenta')
        })
    })
})

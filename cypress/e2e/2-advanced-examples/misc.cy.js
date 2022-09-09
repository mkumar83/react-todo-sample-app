/* eslint-disable func-names, id-length, init-declarations, no-console, no-empty-function, no-invalid-this, no-param-reassign, no-undef, no-unused-expressions, no-unused-vars, one-var, sort-keys, sort-vars, prefer-destructuring */
/* eslint-disable line-comment-position, max-lines, max-lines-per-function, max-statements, no-inline-comments, no-magic-numbers */
// / <reference types="cypress" />
'use strict'

context('Misc', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/misc')
    })

    it('.end() - end the command chain', () => {
        // https://on.cypress.io/end

        /*
         * Cy.end is useful when you want to end a chain of commands
         * and force Cypress to re-query from the root element
         */
        cy.get('.misc-table').within(() => {
            // Ends the current chain and yields null
            cy.contains('Cheryl').click().end()

            // Queries the entire table again
            cy.contains('Charles').click()
        })
    })

    it('cy.exec() - execute a system command', () => {
        /*
         * Execute a system command.
         * so you can take actions necessary for
         * your test outside the scope of Cypress.
         * https://on.cypress.io/exec
         */

        /*
         * We can use Cypress.platform string to
         * select appropriate command
         * https://on.cypress/io/platform
         */
        cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`)

        /*
         * On CircleCI Windows build machines we have a failure to run bash shell
         * https://github.com/cypress-io/cypress/issues/5169
         * so skip some of the tests by passing flag "--env circle=true"
         */
        const isCircleOnWindows =
            Cypress.platform === 'win32' && Cypress.env('circle')

        if (isCircleOnWindows) {
            cy.log('Skipping test on CircleCI')

            return
        }

        /*
         * Cy.exec problem on Shippable CI
         * https://github.com/cypress-io/cypress/issues/6718
         */
        const isShippable =
            Cypress.platform === 'linux' && Cypress.env('shippable')

        if (isShippable) {
            cy.log('Skipping test on ShippableCI')

            return
        }

        cy.exec('echo Jane Lane').its('stdout').should('contain', 'Jane Lane')

        if (Cypress.platform === 'win32') {
            cy.exec(`print ${Cypress.config('configFile')}`)
                .its('stderr')
                .should('be.empty')
        } else {
            cy.exec(`cat ${Cypress.config('configFile')}`)
                .its('stderr')
                .should('be.empty')

            cy.exec('pwd').its('code').should('eq', 0)
        }
    })

    it('cy.focused() - get the DOM element that has focus', () => {
        // https://on.cypress.io/focused
        cy.get('.misc-form').find('#name').click()
        cy.focused().should('have.id', 'name')

        cy.get('.misc-form').find('#description').click()
        cy.focused().should('have.id', 'description')
    })

    context('Cypress.Screenshot', () => {
        it('cy.screenshot() - take a screenshot', () => {
            // https://on.cypress.io/screenshot
            cy.screenshot('my-image')
        })

        it('Cypress.Screenshot.defaults() - change default config of screenshots', () => {
            Cypress.Screenshot.defaults({
                blackout: ['.foo'],
                capture: 'viewport',
                clip: { x: 0, y: 0, width: 200, height: 200 },
                scale: false,
                disableTimersAndAnimations: true,
                screenshotOnRunFailure: true,
                onBeforeScreenshot() {},
                onAfterScreenshot() {},
            })
        })
    })

    it('cy.wrap() - wrap an object', () => {
        // https://on.cypress.io/wrap
        cy.wrap({ foo: 'bar' })
            .should('have.property', 'foo')
            .and('include', 'bar')
    })
})
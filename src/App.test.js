'use strict'

import App from './App'
// eslint-disable-next-line sort-imports, no-redeclare
import { render, screen } from '@testing-library/react'

test('renders Hello World', () => {
    render(<App />)
    const linkElement = screen.getByText(/Hello World/i)
    expect(linkElement).toBeInTheDocument()
})

test('renders Integrated CI', () => {
    render(<App />)
    const linkElement = screen.getByText(/Integrated CI Test/i)
    expect(linkElement).toBeInTheDocument()
})

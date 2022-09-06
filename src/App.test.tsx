'use strict'

import App from './App'
// eslint-disable-next-line sort-imports, no-redeclare
import { render, screen } from '@testing-library/react'

test('renders Your message is', () => {
    render(<App />)
    const linkElement = screen.getByText(/Hello World/i)
    expect(linkElement).toBeInTheDocument()
})

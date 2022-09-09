'use strict'

import App from './App'
// eslint-disable-next-line sort-imports, no-redeclare
import { render, screen } from '@testing-library/react'

test('renders Your message is', () => {
    render(<App />)
    expect(screen.getByText('Test Todo Activity')).toBeInTheDocument()
    expect(screen.getByText('Test Todo Activity 2')).toBeInTheDocument()
})
